/* eslint linebreak-style: off */
function numberOfDays(periodType, timeToElapse) {
  if (periodType === 'days') {
    return timeToElapse;
  }
  if (periodType === 'weeks') {
    return 7 * timeToElapse;
  }
  if (periodType === 'months') {
    return 30 * timeToElapse;
  }
  return null;
}

function hospitalBedsAvailable(totalHospitalBeds, severeCasesByRequestedTime) {
  const bedAvalibility = 0.35 * totalHospitalBeds;
  return bedAvalibility - severeCasesByRequestedTime;
}

const covid19ImpactEstimator = (data) => {
  /* eslint no-console:off */
  const impact = {};
  const severeImpact = {};
  const normalizePeriod = numberOfDays(data.periodType, data.timeToElapse);
  const exponent = Math.trunc(normalizePeriod / 3);

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** exponent;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** exponent;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = parseInt(
    hospitalBedsAvailable(
      data.totalHospitalBeds,
      impact.severeCasesByRequestedTime
    ),
    10
  );
  severeImpact.hospitalBedsByRequestedTime = parseInt(
    hospitalBedsAvailable(
      data.totalHospitalBeds,
      severeImpact.severeCasesByRequestedTime
    ),
    10
  );
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = parseInt(
    impact.infectionsByRequestedTime * 0.02,
    10
  );
  severeImpact.casesForVentilatorsByRequestedTime = parseInt(
    severeImpact.infectionsByRequestedTime * 0.02,
    10
  );
  /* eslint operator-linebreak: off */
  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    numberOfDays(data.periodType, data.timeToElapse) *
    data.region.avgDailyIncomeInUSD *
    data.region.avgDailyIncomePopulation;

  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    numberOfDays(data.periodType, data.timeToElapse) *
    data.region.avgDailyIncomeInUSD *
    data.region.avgDailyIncomePopulation;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

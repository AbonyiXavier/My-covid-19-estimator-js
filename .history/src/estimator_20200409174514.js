/* eslint linebreak-style: off */
const covid19ImpactEstimator = (data) => {
  /* eslint linebreak-style: off */
  let normalizePeriod;
  if (data.periodType === 'days') {
    normalizePeriod = data.timeToElapse;
  }
  /* eslintno-trailing-spaces */
  if (data.periodType === 'weeks') {
    normalizePeriod = 7 * data.timeToElapse;
  }
  if (data.periodType === 'months') {
    normalizePeriod = 30 * data.timeToElapse;
  }

  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const power = Math.floor(normalizePeriod / 3);

  const infections = impact.currentlyInfected * 2 ** power;
  const severeInfections = severeImpact.currentlyInfected * 2 ** power;

  const severeCases = 0.15 * infections;
  const sSevereCases = 0.15 * severeInfections;

  const bedAvailability = 0.35 * data.totalHospitalBeds;

  impact.infectionsByRequestedTime = Math.floor(
    impact.currentlyInfected * 2 ** power
  );
  severeImpact.infectionsByRequestedTime = Math.floor(
    severeImpact.currentlyInfected * 2 ** power
  );

  impact.severeCasesByRequestedTime = Math.floor(severeCases);
  severeImpact.severeCasesByRequestedTime = Math.floor(sSevereCases);

  impact.hospitalBedsByRequestedTime = Math.floor(
    bedAvailability - severeCases
  );
  severeImpact.hospitalBedsByRequestedTime = Math.floor(
    bedAvailability - sSevereCases
  );

  impact.casesForICUByRequestedTime = Math.floor(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.floor(
    0.05 * severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  const majorityEarning = Number(data.region.avgDailyIncomePopulation);
  const avgDailyIncome = Number(data.region.avgDailyIncomeInUSD);
  const days = Number(normalizePeriod);
  /* eslint operator-linebreak: off */
  const dollarsInFlight =
    impact.infectionsByRequestedTime * majorityEarning * avgDailyIncome * days;
  const sDollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    majorityEarning *
    avgDailyIncome *
    days;

  impact.dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
  severeImpact.dollarsInFlight = parseFloat(sDollarsInFlight.toFixed(2));

  const result = {
    data,
    impact,
    severeImpact
  };

  return result;
};

export default covid19ImpactEstimator;

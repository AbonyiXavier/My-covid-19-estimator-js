/* eslint linebreak-style: off */
const covid19ImpactEstimator = (data) => {
  let normalizePeriod;
  if (data.periodType === 'days') {
    normalizePeriod = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    normalizePeriod = 7 * data.timeToElapse;
  }
  if (data.periodType === 'months') {
    normalizePeriod = 30 * data.timeToElapse;
  }
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  const power = parseInt(normalizePeriod / 3, 10);

  const infections = impact.currentlyInfected * 2 ** power;
  const sInfections = severeImpact.currentlyInfected * 2 ** power;

  const severeCases = 0.15 * infections;
  const sSevereCases = 0.15 * sInfections;

  const availableBed = 0.35 * data.totalHospitalBeds;

  impact.infectionsByRequestedTime = Math.trunc(
    impact.currentlyInfected * 2 ** power
  );
  severeImpact.infectionsByRequestedTime = Math.trunc(
    severeImpact.currentlyInfected * 2 ** power
  );

  impact.severeCasesByRequestedTime = Math.trunc(severeCases);
  severeImpact.severeCasesByRequestedTime = Math.trunc(sSevereCases);

  impact.hospitalBedsByRequestedTime = Math.trunc(availableBed - severeCases);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    availableBed - sSevereCases
  );

  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  const avgDailyIncomePopulation = Number(data.region.avgDailyIncomePopulation);
  const avgDailyIncome = Number(data.region.avgDailyIncomeInUSD);
  const days = Number(normalizePeriod);
  /* eslint operator-linebreak: off */
  const dollarsInFlight =
    impact.infectionsByRequestedTime *
    avgDailyIncomePopulation *
    avgDailyIncome *
    days;
  const sDollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    avgDailyIncomePopulation *
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

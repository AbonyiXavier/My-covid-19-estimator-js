// /* eslint linebreak-style: off */
// const covid19ImpactEstimator = (data) => {
//   /* eslint linebreak-style: off */
//   let normalizePeriod;
//   if (data.periodType === 'days') {
//     normalizePeriod = data.timeToElapse;
//   }
//   /* eslintno-trailing-spaces */
//   if (data.periodType === 'weeks') {
//     normalizePeriod = data.timeToElapse * 7;
//   }
//   if (data.periodType === 'months') {
//     normalizePeriod = data.timeToElapse * 30;
//   }
//   if (data.periodType === 'years') {
//     normalizePeriod = data.timeToElapse * 30 * 365;
//   }

//   const impact = {};
//   const severeImpact = {};
//   impact.currentlyInfected = data.reportedCases * 10;
//   severeImpact.currentlyInfected = data.reportedCases * 50;

//   const power = Math.trunc(normalizePeriod / 3);

//   const impactInfectionsByRequestedTime = impact.currentlyInfected * 2 ** power;
//   const severeImpactinfectionsByRequestedTime =
//     severeImpact.currentlyInfected * 2 ** power;

//   const impactSevereCasesByRequestedTime =
//     impactInfectionsByRequestedTime * 0.15;
//   const severeImpactSevereCasesByRequestedTime =
//     severeImpactinfectionsByRequestedTime * 0.15;

//   const availableBed = data.totalHospitalBeds * 0.35;

//   impact.infectionsByRequestedTime = Math.trunc(
//     impact.currentlyInfected * 2 ** power
//   );
//   severeImpact.infectionsByRequestedTime = Math.trunc(
//     severeImpact.currentlyInfected * 2 ** power
//   );

//   impact.severeCasesByRequestedTime = Math.trunc(
//     impactSevereCasesByRequestedTime
//   );
//   severeImpact.severeCasesByRequestedTime = Math.trunc(
//     severeImpactSevereCasesByRequestedTime
//   );

//   impact.hospitalBedsByRequestedTime = Math.trunc(
//     availableBed - impactSevereCasesByRequestedTime
//   );
//   severeImpact.hospitalBedsByRequestedTime = Math.trunc(
//     availableBed - severeImpactSevereCasesByRequestedTime
//   );

//   impact.casesForICUByRequestedTime = Math.trunc(
//     0.05 * impact.infectionsByRequestedTime
//   );
//   severeImpact.casesForICUByRequestedTime = Math.trunc(
//     0.05 * severeImpact.infectionsByRequestedTime
//   );

//   impact.casesForVentilatorsByRequestedTime = Math.trunc(
//     0.02 * impact.infectionsByRequestedTime
//   );
//   severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
//     0.02 * severeImpact.infectionsByRequestedTime
//   );

//   const majorityEarning = Number(data.region.avgDailyIncomePopulation);
//   const avgDailyIncome = Number(data.region.avgDailyIncomeInUSD);
//   const days = Number(normalizePeriod);
//   /* eslint operator-linebreak: off */
//   const dollarsInFlight =
//     impact.infectionsByRequestedTime * majorityEarning * avgDailyIncome * days;
//   const sDollarsInFlight =
//     severeImpact.infectionsByRequestedTime *
//     majorityEarning *
//     avgDailyIncome *
//     days;

//   impact.dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
//   severeImpact.dollarsInFlight = parseFloat(sDollarsInFlight.toFixed(2));

//   const result = {
//     data,
//     impact,
//     severeImpact
//   };

//   return result;
// };

// export default covid19ImpactEstimator;

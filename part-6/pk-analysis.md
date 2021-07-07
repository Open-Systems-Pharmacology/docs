Calculating PK parameters of simulation outputs
===============================================

PK parameters such as AUC, C\_max, etc., can be calculated for all
outputs of a simulation. First, simulation results must be calculated,
and the `SimulationResults` object is then passed to the method
`calculatePKAnalyses`. For the list of calculated PK parameters and
their description, please refer to [OSPS
documentation](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-simulations#pk-analysis-view).

    library(ospsuite)

    # Load  the simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Run the simulation
    simulationResults <- runSimulation(simulation = sim)

    # Calculate PK-analyses
    pkAnalysis <- calculatePKAnalyses(results = simulationResults)

    # Get the path of the simulated output
    outputPath <- simulationResults$allQuantityPaths[[1]]
    print(outputPath)
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

    # Get all calculated PK parameters for the output path
    allPkParams <- pkAnalysis$allPKParametersFor(outputPath)
    print(allPkParams)
    #> [[1]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): C_max
    #>   Dimension: Concentration (molar)
    #>   Unit: µmol/l
    #> 
    #> [[2]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): C_max_norm
    #>   Dimension: Concentration (mass)
    #>   Unit: kg/l
    #> 
    #> [[3]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): t_max
    #>   Dimension: Time
    #>   Unit: min
    #> 
    #> [[4]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): C_tEnd
    #>   Dimension: Concentration (molar)
    #>   Unit: µmol/l
    #> 
    #> [[5]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): AUC_tEnd
    #>   Dimension: AUC (molar)
    #>   Unit: µmol*min/l
    #> 
    #> [[6]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): AUC_tEnd_norm
    #>   Dimension: AUC (mass)
    #>   Unit: kg*min/l
    #> 
    #> [[7]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): AUC_inf
    #>   Dimension: AUC (molar)
    #>   Unit: µmol*min/l
    #> 
    #> [[8]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): AUC_inf_norm
    #>   Dimension: AUC (mass)
    #>   Unit: kg*min/l
    #> 
    #> [[9]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): MRT
    #>   Dimension: Time
    #>   Unit: min
    #> 
    #> [[10]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): Thalf
    #>   Dimension: Time
    #>   Unit: min
    #> 
    #> [[11]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): FractionAucLastToInf
    #>   Dimension: Fraction
    #>   Unit: 
    #> 
    #> [[12]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): CL
    #>   Dimension: Flow per weight
    #>   Unit: l/min/kg
    #> 
    #> [[13]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): Vss
    #>   Dimension: Volume per body weight
    #>   Unit: l/kg
    #> 
    #> [[14]]
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): Vd
    #>   Dimension: Volume per body weight
    #>   Unit: l/kg

    # Get C_max parameter
    c_max <- pkAnalysis$pKParameterFor(quantityPath = outputPath, pkParameter = "C_max")

The function `calculatePKAnalyses` returns an object of the class
`SimulationPKAnalyses`, which allows to retrieve either a certain PK
parameter for an output path, or all calculated PK parameters for an
output path.

The methods `$allPKParametersFor` and `$pKParameterFor` return a object
(or a list of objects) of the class `QuantityPKParameter`, with the
fields `$name` which is the name of the pk-parameter (e.g. “C\_max”),
`$quantityPath` the path of the output the parameter has been calculated
for, and `$values` the value (or list of values for a population
simulation).

    # Get C_max parameter
    c_max <- pkAnalysis$pKParameterFor(quantityPath = outputPath, pkParameter = "C_max")

    print(c_max)
    #>   Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood): C_max
    #>   Dimension: Concentration (molar)
    #>   Unit: µmol/l

    c_max$name
    #> [1] "C_max"
    c_max$quantityPath
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"
    c_max$values
    #> [1] 50.25272

In case of a population simulation, `$values` return a list of values
calculated for each individual.

Import and export of PK-analyses
--------------------------------

Population analysis calculated in R can be exported to a \*.csv file and
loaded in PK-Sim, and vice versa.

    # Load and run the simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)
    simulationResults <- runSimulation(simulation = sim)

    # Calculate PK-analysis
    pkAnalysis <- calculatePKAnalyses(results = simulationResults)

    # Export to csv
    csvPKAnalysisPath <- file.path(getwd(), "..", "tests", "data", "PKAnalyses.csv", fsep = .Platform$file.sep)
    exportPKAnalysesToCSV(pkAnalyses = pkAnalysis, filePath = csvPKAnalysisPath)

    # Load from csv
    pkAnalysisLoaded <- importPKAnalysesFromCSV(filePath = csvPKAnalysisPath, simulation = sim)

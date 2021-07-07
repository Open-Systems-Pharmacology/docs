Sensitivity analysis
====================

The models built with OSPS depend on a lot of input parameters which are
based on literature values, measurements, databases, assumptions. For a
given set of input parameters a number of output curves is computed in a
simulation. To assess which input parameters have most impact on the
output curves, a sensitivity analysis of the simulation can be
performed. For more information about theoretical background, see [OSPS
documentation](https://docs.open-systems-pharmacology.org/shared-tools-and-example-workflows/sensitivity-analysis).

In brief, the values of the chosen parameters are changed by a certain
percentage and the impact of these changes on PK parameters of model
outputs is assessed.

Performing a sensitivity analysis
---------------------------------

The first step of performing a sensitivity analysis is creating an
object of the class `SensitivityAnalysis`. At this step, the user can
define which parameters should be considered for the sensitivity
analysis, in which range the values are varied, and how may steps are
performed in one direction (plus and minus). If no parameters are
specified, all constant and suitable for sensitivity calculations
parameters of the simulation will be variated. The list of such
parameters paths for a simulation can be accessed with the method
`potentialVariableParameterPathsFor(simulation)`.

    library(ospsuite)

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "simple.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Get the paths of parameters that will be considered by default.
    potentialSAParameters <- potentialVariableParameterPathsFor(sim)
    print(potentialSAParameters)
    #> [1] "Organism|Volume" "Organism|Q"      "R1|k1"

    # Create a default `SensitivityAnalysis` for the simulation
    sa <- SensitivityAnalysis$new(simulation = sim)
    print(sa)
    #> SensitivityAnalysis: 
    #>   Number of steps: 2
    #>   Variation range: 0.1
    #>   Number of parameters to vary: Will be estimated at run time

    # Create a `SensitivityAnalysis` with specified parameters
    sa <- SensitivityAnalysis$new(simulation = sim, parameterPaths = c("Organism|Q",
                                                                          "Organism|Volume"))
    print(sa)
    #> SensitivityAnalysis: 
    #>   Number of steps: 2
    #>   Variation range: 0.1
    #>   Number of parameters to vary: 2

    # Show which parameters will be varied
    sa$parameterPaths
    #> [1] "Organism|Q"      "Organism|Volume"

New parameters can be added to an existing `SensitivityAnalysis` by
calling the method `addParameterPaths`. WARNING: If no parameters were
specified during the creation of a `SensitivityAnalysis` (all constant
and suitable for sensitivity calculation parameters are considered),
calling `addParameterPaths` will only vary the newly added parameters.

    library(ospsuite)

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "simple.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Create a `SensitivityAnalysis` with specified parameters
    sa <- SensitivityAnalysis$new(simulation = sim, parameterPaths = c("Organism|Q",
                                                                          "Organism|Volume"))
    # Add new parameter
    sa$addParameterPaths("R1|k1")

    # Show which parameters will be varied
    sa$parameterPaths
    #> [1] "Organism|Q"      "Organism|Volume" "R1|k1"

To run the specified `SensitivityAnalysis`, call the method
`runSensitivityAnalysis`. The method returns an object of the class
`SensitivityAnalysisResults`. The impact of the defined parameters is
calculated for PK-Parameters (see [PK Analysis](pk-analysis.md) for
more information) of all model outputs.

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "simple.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Create a `SensitivityAnalysis` with all constant and suitable for sensitivity calculations parameters and suitable for sensitivity calculations parameters
    sa <- SensitivityAnalysis$new(simulation = sim)

    # Run the sensitivity analysis
    saResult <- runSensitivityAnalysis(sa)
    print(saResult)
    #> SensitivityAnalysisResults: 
    #>   Number of calculated sensitivities: 72
    #>   Available PK parameters: C_maxt_maxC_tEndAUC_tEndThalfAUC_infMRTFractionAucLastToInf

The method `allPKParameterSensitivitiesFor` returns a list of
`PKParameterSensitivity` objects. `PKParameterSensitivity` describes the
sensitivity (field `$value`) of a PK-Parameter (`$pkParameterName`) for
the output `$outputPath` calculated for the varied parameter
`$parameterPath`. The argument `totalSensitivityThreshold` of the method
`allPKParameterSensitivitiesFor` is used to filter out the most
impactful parameters. A threshold of 0.9 means that only parameters
participating to a total of 90 percent of the sensitivity would be
returned. A value of 1 would return the sensitivity for all parameters.
If no value is provided, a default value is used.

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Default value of the threshold
    getOSPSuiteSetting("sensitivityAnalysisConfig")$totalSensitivityThreshold
    #> [1] 0.9

    # Create a `SensitivityAnalysis` with all constant parameters and run it
    sa <- SensitivityAnalysis$new(simulation = sim, parameterPaths = c("Aciclovir|Lipophilicity",
                                                                          "Aciclovir|Fraction unbound (plasma)",
                                                                          "Organism|Age"))
    saResult <- runSensitivityAnalysis(sa)
    print(saResult)
    #> SensitivityAnalysisResults: 
    #>   Number of calculated sensitivities: 11
    #>   Available PK parameters: C_maxt_maxC_tEndAUC_tEndAUC_infMRTThalfFractionAucLastToInfCLVssVd

    # Get sensitivities for the parameter "AUC_inf" of the simulated output with a threshold of 0.8
    outputPath <- sim$outputSelections$allOutputs[[1]]$path
    sensitivities <- saResult$allPKParameterSensitivitiesFor(pkParameterName = "AUC_inf", outputPath = outputPath, totalSensitivityThreshold = 0.8)
    print(sensitivities)
    #> [[1]]
    #> PKParameterSensitivity: 
    #>   Parameter name: Aciclovir-Lipophilicity
    #>   PK-Parameter: AUC_inf
    #>   Output path: Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)
    #>   Value: 0.00470882781612934

The value `-1` for the sensitivity of “AUC\_inf” of the output
`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`
for the parameter `Organism-Kidney-Volume` means that increasing
`Organism-Kidney-Volume` by 10% will decrease “AUC\_inf” by 10%. Note
that the list of sensitivities is ordered from largest to smallest with
respect to magnitude.

Import and export of sensitivity analysis results
-------------------------------------------------

Sensitivity analysis calculated in R can be exported to a \*.csv file,
which can be loaded in another instance.

    # Load and run the simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "simple.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)
    simulationResults <- runSimulation(simulation = sim)

    # Create a `SensitivityAnalysis` with all constant parameters and run it
    sa <- SensitivityAnalysis$new(simulation = sim)
    saResult <- runSensitivityAnalysis(sa)

    # Export to csv
    saResultPath <- file.path(getwd(), "..", "tests", "data", "SAResult.csv", fsep = .Platform$file.sep)
    exportSensitivityAnalysisResultsToCSV(results = saResult, filePath = saResultPath)

    # Load from csv
    saResultLoaded <- importSensitivityAnalysisResultsFromCSV(filePaths = saResultPath, simulation = sim)

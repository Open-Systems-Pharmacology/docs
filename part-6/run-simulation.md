Running a simulation
====================

Running individual simulation and retrieving the results
--------------------------------------------------------

Once the simulation is loaded (see [Loading a simulation and accessing
entities](load-get.md)), it can be run to produce an object of the
class `SimulationResults`.

    library(ospsuite)

    # Load the simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    simulationResults <- runSimulation(simulation = sim)
    print(simulationResults)
    #> SimulationResults: 
    #>   Number of individuals: 1

The advantage of storing the results in a object is the option to keep
different results of the same simulation produced with different
settings (e.g., model parameters).

Simulated time-value pairs for a specific output from the
`SimulationResults`-object can be accessed with the method
`getOutputValues`. The user can provide either the path(s) of the output
(which can be a molecule, a parameter, or an observer), or the object(s)
of the type `Molecule`, `Parameter`, or `Quantity` (for observers) with
the argument `quantitiesOrPaths`. If no output is specified, all outputs
available in the simulation results are returned.

The paths of all available outputs can be accessed via

    simulationResults$allQuantityPaths
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

`getOutputValues` returns a list with two entries: `data` and
`metadata`:

-   `data` is a dataframe with two predefined columns (IndividualId and
    Time) as well as one column for each requested output

    -   `IndividualId` (not relevant for an individual simulation)
    -   `Time` a vector with simulated time values (in minutes, equal
        for all outputs)
    -   a vector with simulated entries for each output requested.

-   `metaData` is a list containing one entry for each requested output.
    Each entry contains information pertinent to the output such as its
    dimension or the unit.

    # Get simulated results by path
    resultsPath <- simulationResults$allQuantityPaths[[1]]
    print(resultsPath)
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

    resultsData <- getOutputValues(simulationResults, quantitiesOrPaths = resultsPath)

    resultsTime <- resultsData$data$Time
    resultsValues <- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

    plot(resultsTime, resultsValues, type = "l")

![](data:image/png;base64,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)

The results can be stored in and imported from a \*.csv file with the
methods `exportResultsToCSV` and `importResultsFromCSV`.

    # Load and run the simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)
    simulationResults <- runSimulation(simulation = sim)

    # Export to csv
    csvResultsPath <- file.path(getwd(), "..", "tests", "data", "SimResults.csv", fsep = .Platform$file.sep)
    exportResultsToCSV(results = simulationResults, filePath = csvResultsPath)

    # Load from csv
    resultsLoaded <- importResultsFromCSV(filePath = csvResultsPath, simulation = sim)
    print(resultsLoaded)
    #> SimulationResults: 
    #>   Number of individuals: 1

Adding new outputs
------------------

By default, only outputs that were selected in PK-Sim or MoBi prior to
the export of the simulation to `pkml` are generated. The user can add
new outputs to the simulation with the method `addOutputs`. The outputs
can be provided either as objects of the type(s) `Molecule`,
`Parameter`, or `Quantity`, or as path strings. The output list is a
property of the `simulation`. After adding or removing outputs, the
corresponding simulation needs to be re-run in order to generate updated
results.

    # Clear the list of generated outputs
    clearOutputs(sim)

    # Add new outputs as objects
    molecule <- getMolecule("Organism|Kidney|Intracellular|Aciclovir", sim)
    observer <- getQuantity("Organism|Lumen|Aciclovir|Fraction dissolved", sim)

    addOutputs(c(molecule, observer), simulation = sim)

    # Add new outputs as path strings
    addOutputs(c("Organism|Lumen|Stomach|Aciclovir", 
                 "Organism|PeripheralVenousBlood|Aciclovir|Whole Blood (Peripheral Venous Blood)"),
               simulation = sim)

    # Run simulation
    simulationResults <- runSimulation(simulation = sim)

    # Retrieve all generated outputs (e.g. omitting the quantitiesOrPaths property
    # will return all available values)
    resultsData <- getOutputValues(simulationResults)

    # Note that "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)" 
    # is not in the list of generated results any more
    names(resultsData$data)
    #> [1] "IndividualId"                                                                  
    #> [2] "Time"                                                                          
    #> [3] "Organism|Kidney|Intracellular|Aciclovir"                                       
    #> [4] "Organism|Lumen|Stomach|Aciclovir"                                              
    #> [5] "Organism|PeripheralVenousBlood|Aciclovir|Whole Blood (Peripheral Venous Blood)"
    #> [6] "Organism|Lumen|Aciclovir|Fraction dissolved"

Changing simulation intervals
-----------------------------

The simulation interval (i.e., the simulation times at which results are
stored) can are stored as the property `outputSchema` of a `Simulation`
object.

    print(sim$outputSchema)
    #> OutputSchema: 
    #> Interval: 
    #>   Name: Simulation interval high resolution
    #>   Start time: 0.00 [min]
    #>   End time: 15.00 [min]
    #>   Resolution: 1.00 [pts/min]
    #> Interval: 
    #>   Name: Simulation Interval 1
    #>   Start time: 15.00 [min]
    #>   End time: 1440.00 [min]
    #>   Resolution: 0.33333 [pts/min]
    #> Interval: 
    #>   Name: Simulation Interval 2
    #>   Start time: 120.00 [min]
    #>   End time: 1440.00 [min]
    #>   Resolution: 0.066667 [pts/min]

To change the simulation interval, the user can use one of the functions
`clearOutputIntervals`, `addOutputInterval`, and `setOutputInterval`.

    # Remove all output intervals - simulation not possible!
    clearOutputIntervals(simulation = sim)
    runSimulation(simulation = sim)
    #> Error in rClr::clrCall(simulationRunner, "Run", simulationRunArgs): Type:    OSPSuite.Utility.Exceptions.OSPSuiteException
    #> Message: Time points output schema is empty
    #> Method:  Void RunSimulation()
    #> Stack trace:
    #>    at OSPSuite.SimModel.Simulation.RunSimulation()
    #>    at OSPSuite.Core.Domain.Services.SimModelManager.simulate()
    #>    at OSPSuite.Core.Domain.Services.SimModelManager.doIfNotCanceled(Action actionToExecute)
    #>    at OSPSuite.Core.Domain.Services.SimModelManager.RunSimulation(IModelCoreSimulation simulation, SimulationRunOptions simulationRunOptions)
    #>    at OSPSuite.R.Services.SimulationRunner.<>c__DisplayClass13_0.<runAsync>b__0()
    #>    at System.Threading.Tasks.Task`1.InnerInvoke()
    #>    at System.Threading.Tasks.Task.Execute()

    # Add an interval
    addOutputInterval(simulation = sim, startTime = 0, endTime = 20, resolution = 60, intervalName = "highRes")
    print(sim$outputSchema)
    #> OutputSchema: 
    #> Interval: 
    #>   Name: highRes
    #>   Start time: 0.00 [min]
    #>   End time: 20.00 [min]
    #>   Resolution: 60.00 [pts/min]

    # Add a second interval
    addOutputInterval(simulation = sim, startTime = 30, endTime = 2000, resolution = 4, intervalName = "lowRes")
    print(sim$outputSchema)
    #> OutputSchema: 
    #> Interval: 
    #>   Name: highRes
    #>   Start time: 0.00 [min]
    #>   End time: 20.00 [min]
    #>   Resolution: 60.00 [pts/min]
    #> Interval: 
    #>   Name: lowRes
    #>   Start time: 30.00 [min]
    #>   End time: 2000.00 [min]
    #>   Resolution: 4.00 [pts/min]

    # Replace the existing interval(s) with a new one
    setOutputInterval(simulation = sim, startTime = 0, endTime = 2000, resolution = 4)
    print(sim$outputSchema)
    #> OutputSchema: 
    #> Interval: 
    #>   Name: Output interval
    #>   Start time: 0.00 [min]
    #>   End time: 2000.00 [min]
    #>   Resolution: 4.00 [pts/min]

Population simulations
======================

Population simulations
----------------------

Population simulations can be easily performed in R by combining the
simulation loaded from a \*.pkml file with the population information
created in PK-Sim and exported to CSV format (for details, please refer
to [OSPS online
documentation](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-creating-populations))
or created directly in R (see [Creating
populations](#creating-populations)).

### Loading population file

The method `loadPopulation` creates an object of the `Population` class
that can be passed to the `runSimulation` method (see [Running
simulations and retrieving the results](run-simulation.md)).

    library(ospsuite)
    # Load population information from csv
    popFilePath <- file.path(getwd(), "..", "tests", "data", "pop_10.csv", fsep = .Platform$file.sep)
    myPopulation <- loadPopulation(csvPopulationFile = popFilePath)
    print(myPopulation)
    #> Population: 
    #>   Number of Individuals: 10

Creating populations
--------------------

Similar to creating individual parameter sets (see [Creating
individuals](create-individual.md)), a population is created from
*population characteristics* created by calling the method
`createPopulationCharacteristics`. To see the list of available values
for the arguments `species` and `population` (only for human), use the
enums `Species` and `HumanPopulation`, respectively. The returned object
of type `PopulationCharacteristics` is then passed to the function
`createPopulation` to generate a set of parameter values. The algorithm
behind is the same used in PK-Sim when creating an population. Molecule
ontogenies can be added as described in the vignette [Creating
individuals](create-individual.md).

    library(ospsuite)

    #If no unit is specified, the default units are used. For "height" it is "dm", for "weight" it is "kg", for "age" it is "year(s)".
    populationCharacteristics <- createPopulationCharacteristics(
                                                species = Species$Human,
                                                population = HumanPopulation$Asian_Tanaka_1996,
                                                numberOfIndividuals = 50,
                                                proportionOfFemales = 50,
                                                weightMin = 30,
                                                weightMax = 98,
                                                weightUnit = "kg",
                                                heightMin = NULL,
                                                heightMax = NULL,
                                                ageMin = 0,
                                                ageMax = 80,
                                                ageUnit = "year(s)")
    print(populationCharacteristics)
    #> PopulationCharacteristics: 
    #>   Species: Human
    #>   Population: Asian_Tanaka_1996
    #>   Number of individuals: 50
    #>   Proportion of females: 50
    #>   Age: [0.00 year(s)..80.00 year(s)]
    #>   Gestational age: ]-Inf..+Inf[
    #>   Weight: [30.00 kg..98.00 kg]
    #>   Height: ]-Inf..+Inf[
    #>   BMI: ]-Inf..+Inf[

    # Create population from population characteristics
    result <- createPopulation(populationCharacteristics = populationCharacteristics)
    myPopulation <- result$population
    print(myPopulation)
    #> Population: 
    #>   Number of Individuals: 50

Running population simulation
-----------------------------

To run a population simulation, the `Population` object created by the
`createPopulation` method must be passed to the `runSimulation` method:

    library(ospsuite)

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Run population simulation
    simulationResults <- runSimulation(simulation = sim, population = myPopulation)
    print(simulationResults)
    #> SimulationResults: 
    #>   Number of individuals: 50

Population simulations are run in parallel on multi-core machines - one
core simulates a subset of all individuals defined in the population. By
default, the number of cores used equals the maximal number of logical
cores available minus one. The user can change the default behavior by
providing custom `SimulationRunOptions`.

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Create a SimulationRunOptions object
    simRunOptions <- SimulationRunOptions$new()
    print(simRunOptions)
    #> SimulationRunOptions: 
    #>   numberOfCores: 1
    #>   checkForNegativeValues: TRUE
    #>   showProgress: FALSE

    # Change the maximal number of cores to use and show a progress bar during simulation
    simRunOptions$numberOfCores <- 3
    simRunOptions$showProgress <- TRUE

    # Run population simulation with custom options
    populationResults <- runSimulation(simulation = sim, population = myPopulation, simulationRunOptions = simRunOptions)
    print(populationResults)
    #> SimulationResults: 
    #>   Number of individuals: 50

Simulated time-value pairs for a specific output from the
`SimulationResults`-object returned by the `runSimulation` method can be
accessed with the method `getOutputValues`. The user can provide either
the path(s) of the output (which can be a molecule, a parameter, or an
observer), or the object(s) of the type `Molecule`, `Parameter`, or
`Quantity` (for observers) with the argument `quantitiesOrPaths`. If no
output is specified, all outputs available in the simulation results are
returned. The paths of all available outputs can be accessed via

    populationResults$allQuantityPaths
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

`getOutputValues` returns a list with two entries: `data` and
`metadata`:

-   `data` is a dataframe with two predefined columns (IndividualId and
    Time) as well as one column for each requested output
-   `IndividualId`
    -   `Time` a vector with simulated time values (in minutes, equal
        for all outputs)
    -   a vector with simulated entries for each output requested. \*

The values of `IndividualId`, `Time`, and the simulated outputs, are
appended for each simulated individual. Note that this results in
non-monotonously increasing column `Time`.

    # Get simulated results by path
    resultsPath <- populationResults$allQuantityPaths[[1]]
    print(resultsPath)
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

    resultsData <- getOutputValues(populationResults, quantitiesOrPaths = resultsPath)

    resultsTime <- resultsData$data$Time
    resultsValues <- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

    plot(resultsTime, resultsValues, type = "l")

![](data:image/png;base64,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)

To get the results for a specific individual or a set of individuals,
the argument `individualIds` of the method `getOutputValues` can be
specified:

    # Get simulated results by path
    resultsPath <- populationResults$allQuantityPaths[[1]]
    print(resultsPath)
    #> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

    #Get only the results for individuals with IDs 1 and 2
    resultsData <- getOutputValues(populationResults, quantitiesOrPaths = resultsPath, individualIds = c(1, 2))

    resultsTime <- resultsData$data$Time
    resultsValues <- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

    plot(resultsTime, resultsValues, type = "l")

![](data:image/png;base64,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)

For more information about running simulations, please refer to [Running
simulations and retrieving the results](run-simulation.md).

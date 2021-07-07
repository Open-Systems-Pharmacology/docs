Creating individuals
====================

The ospsuite-R package provides an interface to the PK-Sim physiology
database to create parameter sets describing a certain **individual**.
By applying these parameter values to a simulation, it is possible to
simulate different individuals based on one exported \*.pkml simulation.
This functionality is only available when PK-Sim is installed on the
system.

The easier way to get started is to install the OSPSuite Setup. This
will link PK-Sim to your ospsuite-R installation automatically. If the
portable version of PK-Sim is used instead, one must specify the path to
the PK-Sim folder by calling the function `initPKSim`:

Creating individuals
--------------------

The physiology of an individual is defined by the values of the
simulation parameters. To simulate a specific individual, one has to
generate a set of parameter values and apply these values to the model.
**NOTE**: Currently, only individuals of the *same* species as in the
original \*.pkml simulation can be applied. I.e., if the simulation
exported from PK-Sim represents a human individual, it is possible to
simulate another human individual of different race, gender, etc., but
it is not possible to simulate a rat. Though it is technically possible,
and the simulation will produce some results, these will not valid.

The first step is creating an object describing *individual
characteristics*. To see the list of available values for the arguments
`species`, `population` (only for human), and `gender` (only for human),
use the enums `Species`, `HumanPopulation`, and `Gender`, respectively.
This object is then passed to the function `createIndividual` to
generate a set of parameter values. The algorithm behind is the same
used in PK-Sim when creating an Individual-Building Block.

    library(ospsuite)
    #> Loading required package: rClr
    #> Loading the dynamic library for Microsoft .NET runtime...
    #> Loaded Common Language Runtime version 4.0.30319.42000

    #If no unit is specified, the default units are used. For "weight" it is "kg", for "age" it is "year(s)".
    individualCharacterstics <- createIndividualCharacteristics(species = Species$Human,
                                                                population = HumanPopulation$Japanese_Population,
                                                                gender = Gender$Female,
                                                                weight = 75,
                                                                height = 1.75,
                                                                heightUnit = "m",
                                                                age = 43)
    print(individualCharacterstics)
    #> IndividualCharacteristics: 
    #>   Species: Human
    #>   Population: Japanese_Population
    #>   Gender: FEMALE
    #>   Age: 43.00 [year(s)]
    #>   Gestational age: 40.00 [week(s)]
    #>   Weight: 75.00 [kg]
    #>   Height: 1.75 [m]

    individual <- createIndividual(individualCharacteristics = individualCharacterstics)

The output contains two lists of parameters - `distributedParameters`
and `derivedParameters`. The first list contains parameters that differ
between the individuals of the selected species, while the second list
mostly consists of values of parameters defined by formulas in the
simulation. When applying the generated individual parameter set to a
simulation in R, only parameters from the `distributedParameters` should
be overwritten, otherwise formula dependencies may be destroyed.
Generated parameter values can be conveniently applied using the
`setParameterValuesByPath` method:

    library(ospsuite)

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Apply individual parameters
    setParameterValuesByPath(parameterPaths = individual$distributedParameters$paths,
                             values = individual$distributedParameters$values,
                             simulation = sim)

Adding enzyme ontogenies
------------------------

The PK-Sim database includes ontogeny information for some proteins (see
(PK-Sim Ontogeny
Database)\[<a href="https://github.com/Open-Systems-Pharmacology/OSPSuite.Documentation/blob/master/PK-Sim%20Ontogeny%20Database%20Version%207.3.pdf" class="uri">https://github.com/Open-Systems-Pharmacology/OSPSuite.Documentation/blob/master/PK-Sim%20Ontogeny%20Database%20Version%207.3.pdf</a>\]).
For a protein molecule present in the simulation, it is possible to add
the ontogeny information on one of the pre-defined proteins. For
example, it is possible to set the ontogeny of the protein `MyProtein`
to the value of the ontogeny of a CYP3A4 enzyme for the specified
individual. The list of supported ontogenies is stored in the
`StandardOntogeny`-list.

    library(ospsuite)

    # All supported ontogenies
    print(StandardOntogeny)
    #> $CYP1A2
    #> [1] "CYP1A2"
    #> 
    #> $CYP2C18
    #> [1] "CYP2C18"
    #> 
    #> $CYP2C19
    #> [1] "CYP2C19"
    #> 
    #> $CYP2C8
    #> [1] "CYP2C8"
    #> 
    #> $CYP2C9
    #> [1] "CYP2C9"
    #> 
    #> $CYP2D6
    #> [1] "CYP2D6"
    #> 
    #> $CYP2E1
    #> [1] "CYP2E1"
    #> 
    #> $CYP3A4
    #> [1] "CYP3A4"
    #> 
    #> $CYP3A5
    #> [1] "CYP3A5"
    #> 
    #> $CYP3A7
    #> [1] "CYP3A7"
    #> 
    #> $UGT1A1
    #> [1] "UGT1A1"
    #> 
    #> $UGT1A4
    #> [1] "UGT1A4"
    #> 
    #> $UGT1A6
    #> [1] "UGT1A6"
    #> 
    #> $UGT1A9
    #> [1] "UGT1A9"
    #> 
    #> $UGT2B4
    #> [1] "UGT2B4"
    #> 
    #> $UGT2B7
    #> [1] "UGT2B7"

    #Create the ontogeny for the protein "MyProtein" based on ontology of CYP3A4
    myProteinOntogeny <- MoleculeOntogeny$new(molecule = "MyProtein", ontogeny = StandardOntogeny$CYP3A4)
    print(myProteinOntogeny)
    #> MoleculeOntogeny: 
    #>   Molecule: MyProtein
    #>   Ontogeny: CYP3A4

    # Add this ontogeny to the individual characteristics used to create the individual parameters set
    individualCharacterstics <- createIndividualCharacteristics(species = Species$Human,
                                                                population = HumanPopulation$Japanese_Population,
                                                                gender = Gender$Female,
                                                                weight = 75,
                                                                height = 1.75,
                                                                heightUnit = "m",
                                                                age = 43,
                                                                moleculeOntogenies = myProteinOntogeny)
    print(individualCharacterstics)
    #> IndividualCharacteristics: 
    #>   Species: Human
    #>   Population: Japanese_Population
    #>   Gender: FEMALE
    #>   Age: 43.00 [year(s)]
    #>   Gestational age: 40.00 [week(s)]
    #>   Weight: 75.00 [kg]
    #>   Height: 1.75 [m]
    #>   Molecule MyProtein with ontogeny CYP3A4

    individual <- createIndividual(individualCharacteristics = individualCharacterstics)

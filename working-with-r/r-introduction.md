# R - Introduction

## R - Introduction

The **ospsuite** R-package provides the functionality of loading, manipulating, and simulating the simulations created in the software tools PK-Sim and MoBi. This document gives an overview of the general workflow and the most important methods.

### Installing the R-Toolbox

Installation instructions are provided here: [https://github.com/Open-Systems-Pharmacology/OSPSuite-R/blob/develop/README.md\#installation](https://github.com/Open-Systems-Pharmacology/OSPSuite-R/blob/develop/README.md#installation)

### General information

In order to load a simulation in R, it must be present in the **\*.pkml** file format. Every simulation in PK-Sim or MoBi can be exported to the \*.pkml file. The examples shown are based on the _Aciclovir_ example model, until stated otherwise. The model can be found in the PK-Sim examples folder of the OSPS installation.

The general workflow with the **ospsuite** package can be summarized in following steps:

1. Loading a simulation from .pkml file.
2. Accessing entities of the simulation, such as molecules, parameters, or containers, and reading information about them.
3. Changing simulation settings, parameter values, and molecules start values.
4. Retrieving the results and processing them.

The workflow steps are described in the following sections:

* [Loading a simulation and accessing entities](r-introduction.md#loading-a-simulation-and-accessing-entities)
* [Changing parameter and molecule start values](r-introduction.md#changing-parameter-and-molecule-start-values)
* [Running a simulation](r-introduction.md#running-a-simulation)
* [Working with individuals](r-introduction.md#working-with-individuals)
* [Working with population simulations](r-introduction.md#working-with-population-simulations)
* [PK Analysis](r-introduction.md#calculating-pk-parameters-of-simulation-outputs)
* [Sensitivity analysis](r-introduction.md#sensitivity-analysis)
* [Table parameters](r-introduction.md#table-parameters)
* [Dimensions and Units](r-introduction.md#dimensions-and-units)

Some aspects of the ospsuite package may appear uncommon for the users not familiar with the object-oriented approach. It is recommended to read the following section to better understand some semantics and to get the most of the flexibility and efficiency of the package.

### Object-oriented approach

The **ospsuite** R-package utilizes the concept of object oriented \(OO\) programming based on the [R6 system](https://adv-r.hadley.nz/r6.html). While the philosophy of the package is to offer a functional programming workflow more common for the R users, it is important to understand some basic concepts of the OO programming. Most of the functions implemented in **ospsuite** return an _instance_ \(or an _object_\) of a _class_. These objects can be used as inputs for another functions. Additionally, each object offers a set of properties \(which can be another objects\) and functions, accessible by the `$` sign:

```text
object1 <- ClassName$new()
aProperty <- object1$property1
resultOfAFunction <- object1$multiply(1,2)
```

Important information about the object can be printed out by calling `print(object)`.

The most important classes are:  
`Simulation`  
Representation of the simulation loaded from the \*.pkml file.

`SimulationRunOptions`  
An object defining the options of a simulation run. The options are:

* `numberOfCores` the maximal number of \(logical\) cores that can be used by the \(population\) simulation
* `checkForNegativeValues` a boolean defining if an error if thrown if some variables become negative for which the “negativeValuesAllowed”-flag is set to FALSE \(can be used to ignore numerical noise\)
* `showProgress` a boolean if a “progress bar” is shown in the console representing the progress of the simulation.

`SolverSettings`  
Object defining the settings of the solver. Stored in `SimulationSettings` of a `Simulation` \(accessibly by field `$settings`\).

`OutputSchema`  
Definition of the output intervals of the simulation. The `OutputSchema`defines the total simulation time and the time points at which results are generated. Can be accessed as property of a `Simulation`-object.

`OutputSelections`  
List of quantities \(parameters and molecules\) for which the outputs will be generated. Can be accessed as property of a `Simulation`-object.

`SimulationResults`  
Results of a simulation, either individual or population. Holds the simulated values for all quantities defined in the `OutputSelections`. See [Running a simulation](r-introduction.md#running-a-simulation) for more information.

`Entity`  
Every accessible distinct part of the model. Most prominent entities are `Molecule`, `Parameter`, `Container`. Every `Entity` has properties `$path` representing the path within the model structure and `$parentContainer` being the container this entity is located in.

`Container`  
A `Container` is an element of model structure that contains other entities \(e.g., spatial containers, molecules, parameters\). The most prominent containers are organs and compartments. A loaded `Simulation` is also a container.

`Quantity`  
An `Entity` in the simulation that has a value - namely `Molecule` and `Parameter`. Every `Quantity` has a `$value` and a `dimension`. Further important fields are `$unit`, which is the base unit of the dimension. See [Dimensions and Units](r-introduction.md#dimensions-and-units) for more information.

`Molecule`  
A molecule located in a `Container`. The `$value`-property refers to the initial value in the simulation. Inherits from `Quantity`.

`Parameter`  
A parameter. The `$value`-property refers to the initial value in the simulation. Inherits from `Quantity`.

`Formula`  
The value of each `Quantity` is described by a `Formula`. There are different types of formulae, see [Changing parameter and molecule start values](r-introduction.md#changing-parameter-and-molecule-start-values) for more information.

`IndividualCharacteristics`  
An object used for creating of individual parameter sets with the `createIndividual`-method. See [Creating individuals](r-introduction.md#creating-individuals) for more information.

`Population`  
An object describing a virtual population. Can be either loaded from a \*.csv-file created by PK-Sim or created with the `createPopulation`-method. See [Creating populations](r-introduction.md#creating-populations) for more information.

`PopulationCharacteristics`  
An object used for creating of population parameter sets with the`createPopulation`-method. See [Creating populations](r-introduction.md#creating-populations) for more information.

`SimulationPKAnalyses`  
PK analyses for a simulations result.

`QuantityPKParameter`  
A certain PK parameter for an output quantity. Has the fields `$name` which is the name of the PK parameter \(e.g. “C\_max”\), `$quantityPath` the path of the output the parameter has been calculated for, and `$values` the value \(or list of values for a population simulation\).

`SensitivityAnalysis`  
A class defining the analysis of which input parameters have most impact on the output curves of a simulation. See [Sensitivity analysis](r-introduction.md#sensitivity-analysis) for more information.

`SensitivityAnalysisResults`  
Results of running the `SensitivityAnalysis`

`PKParameterSensitivity`  
The sensitivity \(field `$value`\) of a PK-Parameter \(`$pkParameterName`\) for the output `$outputPath` calculated for the varied parameter `$parameterName`. See [Sensitivity analysis](r-introduction.md#sensitivity-analysis) for more information.

## Loading a simulation and accessing entities

### Loading a simulation

In general, every workflow starts with loading a simulation by calling the `loadSimulation()` function. The function receives the full path to the PKML file \(with extension \*.pkml\) exported from PK-Sim or MoBi and returns the corresponding simulation object.

```text
library(ospsuite)

simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
print(simFilePath)
#> [1] "C:/Users/appveyor/AppData/Local/Temp/1/RtmpY9evoZ/Rbuildce052b82d20/ospsuite/vignettes/../tests/data/Aciclovir.pkml"

sim <- loadSimulation(simFilePath)
print(sim)
#> Simulation: 
#>   Name: Vergin 1995 IV
#>   Source file: C:/Users/appveyor/AppData/Local/Temp/1/RtmpY9evoZ/Rbuildce052b82d20/ospsuite/vignettes/../tests/data/Aciclovir.pkml
```

### Accessing entities of the model and their properties - the path concept

Once the simulation is loaded, it is possible to retrieve various entities of the model. The most important entities are **containers**, **molecules**, and **parameters**. The methods `getContainer`, `getMolecule`, and `getParameter` search for the respective entity with the given `path` located under a `container`. `path` is a string where the elements of the path \(i.e., containers in the hierarchy of the simulation\) are separated by `|`. `container` is an instance of the `Container`-class within the model structure the path is _relative_ to. In most cases, `container` is the `Simulation` object created by calling `loadSimulation(pkmlSimulationFile)`.

```text
#Get the container "Liver"
livContainer <- getContainer("Organism|Liver", sim)
print(livContainer)
#> Container: 
#>   Container type: Organ
#>   Path: Organism|Liver

#Get the molecule Aciclovir located in kindey intracellular space
moleculeInKid <- getMolecule("Organism|Kidney|Intracellular|Aciclovir", sim)
print(moleculeInKid)
#> Molecule: 
#>   Path: Organism|Kidney|Intracellular|Aciclovir
#>   Initial Value: 0.00 [µmol]

#Get the parameter volume of the liver interstitial space.
# Note that the path used is relative to the liver container
livParam <- getParameter("Interstitial|Volume", livContainer)
print(livParam)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 0.3533 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
```

The functions `getAllContainersMatching`, `getAllMoleculesMatching`, and `getAllParametersMatching` return a list of objects representing all entities whose paths match the generic paths provided in the list `paths` located under `container`. Generic paths are constructed by using the wildcard symbols `*` \(exactly one occurrence of any element\) or `**` \(zero or more occurrences of any element\).

```text
# Get the parameter `Volume` of the intracellular space of all organs,
# with exactly one path element before `Intracellular`
volumeParams <- getAllParametersMatching("Organism|*|Intracellular|Volume", sim)
length(volumeParams)
#> [1] 15
#The PBPK model has 15 organs with an "Intracellular" sub-compartment

# Get the parameter `Volume` of the intracellular space of all organs,
# no matter how many sub-containers the organ has
volumeParams <- getAllParametersMatching("Organism|**|Intracellular|Volume", sim)
length(volumeParams)
#> [1] 28
# The list also includes parameters of organs like "Liver|Periportal",
# or the mucosal compartments of the intestine.
```

Note that the path `"Organism|Kidney|*|Intracellular|Volume"` will return no parameters in the standard models, as there are no sub-containers between `Kidney` and `Intracellular`. In contrast, `"Organism|Kidney|**|Intracellular|Volume"` is a valid path.

The functions `getAllXXXMatching` can also be used to retrieve entities from multiple paths:

```text
#Get the molecule Aciclovir located in `Liver|Periportal|Intracellular` and `VenousBlood|Plasma`
molecules <- getAllMoleculesMatching(c("Organism|Liver|Periportal|Intracellular|Aciclovir",
                                       "Organism|VenousBlood|Plasma|Aciclovir"), sim)
print(molecules)
#> [[1]]
#> Molecule: 
#>   Path: Organism|VenousBlood|Plasma|Aciclovir
#>   Initial Value: 0.00 [µmol]
#> 
#> [[2]]
#> Molecule: 
#>   Path: Organism|Liver|Periportal|Intracellular|Aciclovir
#>   Initial Value: 0.00 [µmol]
```

The entities possess various properties that can be accessed through their objects. The most important properties for a container are:

```text
# Path of the container
livContainer$path
#> [1] "Organism|Liver"

# Parent container
livContainer$parentContainer
#> Container: 
#>   Container type: Organism
#>   Path: Organism
```

The most important properties for a molecule are:

```text
#Initial value of the molecule
moleculeInKid$value
#> [1] 0

# Dimension of the molecule. See section "Unit conversion" for more information.
moleculeInKid$dimension
#> [1] "Amount"

# Is the initial value defined by a formula?
moleculeInKid$isFormula
#> [1] FALSE

# Type of the formula. CONSTANT if the value is defined by a constant.
moleculeInKid$formula
#> Formula: 
#>   isConstant: TRUE
```

The most important properties for a parameter are:

```text
#Initial value of the parameter
livParam$value
#> [1] 0.3533005

# Dimension of the parameter. See section "Unit conversion" for more information.
livParam$dimension
#> [1] "Volume"

# Base unit of the parameter. See section "Unit conversion" for more information.
livParam$unit
#> [1] "l"

# Is the initial value defined by a formula?
livParam$isFormula
#> [1] TRUE

# Type of the formula. CONSTANT if the value is defined by a constant.
livParam$formula
#> Formula: 
#>   isFormula: TRUE
#>   formula: f_int*V
```

### Loading simulation tree

A convenient way to traverse the simulation structure is given by the method . The method generates a tree-like list of all paths within the simulation. Each element of the tree contains all the sub-containers of the element. The final elements are strings representing the path to the entity.

```text
# Load simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

# Create simulation tree
simTree <- getSimulationTree(sim)

# Calling simTree would list all entities within the simulation
# Accessing the parameter "Organism|Weight"
simTree$Organism$Weight
#> $path
#> [1] "Organism|Weight"
# 
# Getting all entities located under "Organism|Liver|Periportal|Intracellular"
entitiesList <- simTree$Organism$Liver$Periportal$Intracellular
```

## Changing parameter and molecule start values

### Changing initial values

It is possible to change the initial values of all parameters and molecules in a simulation. It is important to differentiate between the _constant_ values and the values that are defined by a _formula_.

#### Formula types

Every \(initial\) value is described either by a constant or by a formula. If the value is defined by a simple constant, the field `isConstant` of the respective parameter or molecule has the value `TRUE`.

```text
library(ospsuite)

# Load simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

#Get the parameter "Age" of the Organism
ageParam <- getParameter("Organism|Age", sim)
print(ageParam)
#> Parameter: 
#>   Path: Organism|Age
#>   Value: 25.70 [year(s)]
#>   isConstant: TRUE
#>   isStateVariable: FALSE
ageParam$isConstant
#> [1] TRUE
```

If the value is not constant, it is described by one of the formula types:

**Distributed**: Distributed parameters describe a variation around a constant value or between two numerical limits. In the simulation, the behavior equals that of constant values. See [Working with Constant and Distributed Parameters‌](https://docs.open-systems-pharmacology.org/working-with-mobi/mobi-documentation/model-building-components#working-with-constant-and-distributed-parameters) for more information.

```text
#Get the parameter "Volume" of the Liver
liverVolume <- getParameter("Organism|Liver|Volume", sim)
print(liverVolume)
#> Parameter: 
#>   Path: Organism|Liver|Volume
#>   Value: 2.1675 [l]
#>   isDistributed: TRUE
#>   isStateVariable: FALSE
liverVolume$isDistributed
#> [1] TRUE
```

**Explicit formula**: The value of the parameter is given by an explicit formula. The value of an explicit formula can change during the simulation. The string of the formula can be accessed via `parameter$formulaString`.

```text
#Get the parameter "Volume" of the Liver interstital
liverIntVolume <- getParameter("Organism|Liver|Interstitial|Volume", sim)
print(liverIntVolume)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 0.3533 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
liverIntVolume$formulaString
#> [1] "f_int*V"
```

**Table formula**: The value of the parameter is given by a table with x-y value pairs. X values usually refer to the simulation time. See [Table parameters](r-introduction.md#table-parameters) for additional information on how to retrieve or change the table values.

```text
#Get the parameter defined by a table.
tableParam <- getParameter("Organism|TableParameter", sim)
print(tableParam)
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 0.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
```

Additionally, some parameters are modeled as _state variables_. In this case, the parameter has an _initial value_ and a _right hand side \(RHS\)_ formula, both of which can be any formula type.

```text
#Get the parameter defined by a state variable.
stateVariableParam <- getParameter("Organism|StateVariable_Parameter", sim)
print(stateVariableParam)
#> Parameter: 
#>   Path: Organism|StateVariable_Parameter
#>   Value: 0.00
#>   isConstant: TRUE
#>   isStateVariable: TRUE
#>   RHSFormula
#>   isFormula: TRUE
#>   formula: Time * 2

# `value` refers to the initial value of the parameter
stateVariableParam$value
#> [1] 0
# `rhsFormula` is the right hand side of the parameter
stateVariableParam$rhsFormula
#> Formula: 
#>   isFormula: TRUE
#>   formula: Time * 2
```

#### Changing parameters and molecules initial values

The user can change initial values of parameters and molecules with the methods `setParameterValues` and `setMoleculeInitialValues`, respectively.

```text
# Get the parameter Dose
doseParamPath <- "Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose"
doseParam <- getParameter(doseParamPath, sim)
print(doseParam)
#> Parameter: 
#>   Path: Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose
#>   Value: 0.00025 [kg]
#>   isConstant: TRUE
#>   isStateVariable: FALSE

# Change the dose to 350mg. The value has to be converted to base unit, first
newValue <- toBaseUnit(quantity = doseParam, values = 350, unit = "mg")
setParameterValues(parameters = doseParam, values = newValue)
print(doseParam)
#> Parameter: 
#>   Path: Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose
#>   Value: 0.00035 [kg]
#>   isConstant: TRUE
#>   isStateVariable: FALSE
```

Another way to change parameter values is to scale them. The scaling is always performed relative to the current value:

```text
doseParamPath <- "Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose"
doseParam <- getParameter(doseParamPath, sim)
print(doseParam)
#> Parameter: 
#>   Path: Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose
#>   Value: 0.00035 [kg]
#>   isConstant: TRUE
#>   isStateVariable: FALSE

# Double the dose
scaleParameterValues(doseParam, factor = 2)
print(doseParam)
#> Parameter: 
#>   Path: Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose
#>   Value: 7e-04 [kg]
#>   isConstant: TRUE
#>   isStateVariable: FALSE

# Half the dose
scaleParameterValues(doseParam, factor = 0.5)
print(doseParam)
#> Parameter: 
#>   Path: Applications|IV 250mg 10min|Application_1|ProtocolSchemaItem|Dose
#>   Value: 0.00035 [kg]
#>   isConstant: TRUE
#>   isStateVariable: FALSE
```

Only constant values can be set. If the parameters value is defined by a formula \(explicit or table\), the newly assigned value will override the formula. This will be reflected by the field `isFixedValue`. Changing values of formula parameters should be done with caution, as the potential dependency on another simulation parameters will be destroyed.

```text
#Get the parameter "Volume" of the Liver interstital
liverIntVolume <- getParameter("Organism|Liver|Interstitial|Volume", sim)
print(liverIntVolume)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 0.3533 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
# isFixedValue is FALSE as the parameter is defined by its formula
liverIntVolume$isFixedValue
#> [1] FALSE

setParameterValues(liverIntVolume, 1)
print(liverIntVolume)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 1.00 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE
# isFixedValue is TRUE as the value of parameter is overridden by the constant value
liverIntVolume$isFixedValue
#> [1] TRUE
```

The parameter value can be reset to its formula after assigning a constant value:

```text
print(liverIntVolume)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 1.00 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE
# isFixedValue is TRUE as the value of parameter is overridden by the constant value
liverIntVolume$isFixedValue
#> [1] TRUE

liverIntVolume$reset()
print(liverIntVolume)
#> Parameter: 
#>   Path: Organism|Liver|Interstitial|Volume
#>   Value: 0.3533 [l]
#>   isFormula: TRUE
#>   formula: f_int*V
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
liverIntVolume$isFixedValue
#> [1] FALSE
```

Changing the value of a state variable parameter will only change its initial value, but not the right hand side \(i.e., the value in the simulation will still change according to the rhs formula\). To switch to RHS formula off and, by that, make the parameter be only dependent on its initial value, the field `isStateVariable` can be set to `FALSE`. This function is one-way only! It is not possible to re-activate the RHS formula after switching it off.

```text
#Get the parameter defined by a state variable.
stateVariableParam <- getParameter("Organism|StateVariable_Parameter", sim)
print(stateVariableParam)
#> Parameter: 
#>   Path: Organism|StateVariable_Parameter
#>   Value: 0.00
#>   isConstant: TRUE
#>   isStateVariable: TRUE
#>   RHSFormula
#>   isFormula: TRUE
#>   formula: Time * 2

# Setting its value only changes the initial value
setParameterValues(stateVariableParam, 10)
print(stateVariableParam)
#> Parameter: 
#>   Path: Organism|StateVariable_Parameter
#>   Value: 10.00
#>   isConstant: TRUE
#>   isStateVariable: TRUE
#>   RHSFormula
#>   isFormula: TRUE
#>   formula: Time * 2

# Switching the RHS formula off
stateVariableParam$isStateVariable <- FALSE
print(stateVariableParam)
#> Parameter: 
#>   Path: Organism|StateVariable_Parameter
#>   Value: 10.00
#>   isConstant: TRUE
#>   isStateVariable: FALSE

# Switching it on is not supported
stateVariableParam$isStateVariable <- TRUE
#> Error: Creating a RHS Formula is not supported at the moment. This should be done in MoBi.
```

An example how to set the initial values of molecules in all containers to a certain value:

```text
# Get objects representing the molecule Aciclovir in all containers
allAciclovirMolecules <- getAllMoleculesMatching("Organism|**|Aciclovir",sim)

#Set initial values to 10 µmol in all containers
setMoleculeInitialValues(allAciclovirMolecules, rep(10, length(allAciclovirMolecules)))
```

## Running a simulation

### Running individual simulation and retrieving the results

Once the simulation is loaded \(see [Loading a simulation and accessing entities](r-introduction.md#loading-a-simulation-and-accessing-entities)\), it can be run to produce an object of the class `SimulationResults`.

```text
library(ospsuite)

# Load the simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

simulationResults <- runSimulation(simulation = sim)
print(simulationResults)
#> SimulationResults: 
#>   Number of individuals: 1
```

The advantage of storing the results in a object is the option to keep different results of the same simulation produced with different settings \(e.g., model parameters\).

Simulated time-value pairs for a specific output from the `SimulationResults`-object can be accessed with the method `getOutputValues`. The user can provide either the path\(s\) of the output \(which can be a molecule, a parameter, or an observer\), or the object\(s\) of the type `Molecule`, `Parameter`, or `Quantity` \(for observers\) with the argument `quantitiesOrPaths`. If no output is specified, all outputs available in the simulation results are returned.

The paths of all available outputs can be accessed via

```text
simulationResults$allQuantityPaths
#> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"
```

`getOutputValues` returns a list with two entries: `data` and `metadata`:

* `data` is a dataframe with two predefined columns \(IndividualId and Time\) as well as one column for each requested output
* `IndividualId` \(not relevant for an individual simulation\)
  * `Time` a vector with simulated time values \(in minutes, equal

    for all outputs\)

  * a vector with simulated entries for each output requested.
* `metaData` is a list containing one entry for each requested output. Each entry contains information pertinent to the output such as its dimension or the unit.

## Get simulated results by path

```text
resultsPath <- simulationResults$allQuantityPaths[[1]]
print(resultsPath)
#> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"
```

resultsData &lt;- getOutputValues\(simulationResults, quantitiesOrPaths = resultsPath\)

resultsTime &lt;- resultsData$data$Time resultsValues &lt;- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

plot\(resultsTime, resultsValues, type = "l"\)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEgCAMAAAAjXV6yAAAAV1BMVEUAAAAAADoAAGYAOjoAOpAAZrY6AAA6ADo6AGY6kNtmAABmADpmkJBmtrZmtv+QOgCQZgCQkGaQ2/+2ZgC2/7a2///bkDrb////tmb/25D//7b//9v///+Z3c74AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAH0UlEQVR4nO2dgZaiNhSGma3a6naxHbqKyvs/ZwkQUDT5byCZZOL/nbNzWifei99ACOQGi4ZYKWJvQOpQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCCAZ0HFtyGWIL/hwkFBAAoCxBaUvKgvFvTU91EQCEdBIBwFgXA5Croe9s2pKDZnH3lzFFRtzpfdtqm2HvLKB6qxcBd0PZRNXbT/fvxenzdXQVUr50RBhobV9nrYnK8HHmKGhtdD8fF5O67yk7Ugn3kpCITLU1B7jG3O1d7W+nbsr7iMHXnOguqPz5PqpC2GTsXwy7owtMpY0O3YDqTbYbTlNK+aDJwMA+6MBalxkPrYloGiajJgapWxIL0HVeaLsffeg4Y+6FSU5sbjL9+xD+rOYkU7VrS17poUlkv+rAV5zEtB8yize9I5CtJHj3kQOHLZGfupjAUN2G4HjQ7NGvMXZL2jOJy83noPst9RVHeM3l0QuKNYteOAtxYE7yi2F6zvKQiOATWX3R9vKUjO7Wi+HKEgWTgKAuGyEyQYAjrlzU6Q77wUBMJlKUgfZjzEDA2rzfm0tY2SHcLlKEjN99RqVmNVgVDWgsrm8tfv7t/qvDkKUlMW15+fFGRsqC7jq72nQyz5Grwlp/lqq85kq05ieQtak25+0z43QXeTyl7yZiioKNaVlj3mzU5QX/ljn1V1CZehoKbfjazlU/JweQpq1LwOz2KooZ9C8lwF1Z7WauQpiH2QrSHPYtaGHAeBhhxJr2/YIS4kz1GQYMWhvJA8R0F4xaFDGXCGggQrDh0KyTMVBFYcvvceJFlxKC8kz1GQZMWhuJA8R0E+8+YoSE35KBZdzWd/T7qZBFmLONtxUt8NmVqNglI35CqomvYB24rD9nK278XfTtC0B1noT/O3o2VdYsaCBOiBoqoDoaAXjAPFavtugoQ1ilqLeYY6V0FS9FD6dqSgVXlzFOSwoA6Hy1HQwLppsTtBiRtafoj5eUSXyyZEIfrMar6C/Dyiy2kbYrBYkKdHdDltQwyWn8U8zc07bUQE4o+D1M+EDSUhKGVDYSYOxeF01HQNBZk4lIcboyZrKMjEoTzclD5VQ0EmDi1Rnm7a3/3KPdwXEGbiUBzuPn2ahgJNHErDPaRP0lAap3n9YoKGkhKUoqIlggSPKpWGe0qfnKEFggSPKhWHe5E+MUXuggSPKpWHe5Xe4RuZvoBl4yDwqFJ5uNfpU1K0fA+yPKpUHs6UPh1Fi/sg66NKxeHM6VNRtPAstno5AhSUiqLExkHzVvEdLeuDvOXF6WM7WnYW85ZXlN7lqxi9s6STXjen+hBOnj6WpOWzGr7m5h3eU0TQFKiTFq72WfBpH2+4hSeMIOlqn+Ufc7o1GVhVEEHitRo+PlzxjIeoU3jvDRvbap/Zhwjz13+hbBFumxhkD/oGhOqDhKt90ifQWUy62id9Il+LpU80Qd+GSIJsQVe/GiisHQoCUBCAggAUBKAgAAUBKAhAQYBvc20QCwoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFATwL6gWVYL21cZjW+Obxqem4aYvmb6qSJpxhndBdZu2hqnrbnJ2bGt8k3pqmloHKWj6kutBV1lIM87xLagvcEALX7t1M1Nb45v65Wv3LWTxNdO3PEgzPuFbUP8Nd2jBx2nzT7u5Y1vjm0ZBuOkr6mKv63SkGZ/wLuhPtduCgtC2keoRxrbmN+lDTND0NUNLecY5vgX1x7X96Fb7t9rcsa3lTUNfKmn6ens6By4ZZ8QQpNfMCDZXrcO+7PZrBTlknBPhEOuayHb4qc9YdYg5ZHwiQid9GgpQStxljn/oZZ10MzhwyPhEnNN8//fEJ93+c7QfcuFp/n4nkWV8ItJAsR/X4mGb7oOWDhRnghIYKHb7s/hSY2xrfJN6TPG+ETV9yUyQexherAIoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBgHQFdV/0UU7/N5Sw/PjPyxMxxSQtaPZ00L7q6YuhIEBMQdef/6oy5tNQ4XLZdVX1nZXOzt879TCw4eVGC1K/v+x+tYfcXv2qqxQrrN/hvYqogg6qZEdV+qoaqa6arC7KSVDZu+hfbh4FtW86FcM37egIQYgraD/8UHVO9VgT/yDortDyXtC+0T/KMUKQjYwrqNR1mt3n7D/iTNC02uJBUNmMP8YIQTYyviBdgdo/SbecC9IvN2ZBY4QQxBf0UClYfXzOBQ0vN2APCkV0QY+n8s6K7lomQf1/GAT5eZa6ieiCunOQ2kV0de7tuDm3h1U5uBqLdo2CxghBNjK+oG4Uozpi1ZeoT6muKn71u0/VjoP0y2ZBY4QQpDuSTgQKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAjwP4y4jJ6tz1usAAAAAElFTkSuQmCC)

The results can be stored in and imported from a \*.csv file with the methods `exportResultsToCSV` and `importResultsFromCSV`.

```text
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
```

### Adding new outputs

By default, only outputs that were selected in PK-Sim or MoBi prior to the export of the simulation to `pkml` are generated. The user can add new outputs to the simulation with the method `addOutputs`. The outputs can be provided either as objects of the type\(s\) `Molecule`, Parameter`, or`Quantity`, or as path strings. The output list is a property of the`simulation\`. After adding or removing outputs, the corresponding simulation needs to be re-run in order to generate updated results.

```text
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
```

### Changing simulation intervals

The simulation interval \(i.e., the simulation times at which results are stored\) can are stored as the property `outputSchema` of a `Simulation` object.

```text
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
```

To change the simulation interval, the user can use one of the functions `clearOutputIntervals`, `addOutputInterval`, and `setOutputInterval`.

```text
# Remove all output intervals - simulation not possible!
clearOutputIntervals(simulation = sim)
runSimulation(simulation = sim)
#> Error in rClr::clrCall(simulationRunner, "Run", simulation$ref, options$ref): Type:    OSPSuite.Utility.Exceptions.OSPSuiteException
#> Message: Time points output schema is empty
#> Method:  Void RunSimulation()
#> Stack trace:
#>    at OSPSuite.SimModel.Simulation.RunSimulation()
#>    at OSPSuite.Core.Domain.Services.SimModelManager.simulate()
#>    at OSPSuite.Core.Domain.Services.SimModelManager.doIfNotCanceled(Action actionToExecute)
#>    at OSPSuite.Core.Domain.Services.SimModelManager.RunSimulation(IModelCoreSimulation simulation, SimulationRunOptions simulationRunOptions)
#>    at OSPSuite.R.Services.SimulationRunner.<>c__DisplayClass15_0.<RunAsync>b__0()
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
```

## Working with individuals

The ospsuite-R package provides an interface to the PK-Sim physiology database to create parameter sets describing a certain **individual**. By applying these parameter values to a simulation, it is possible to simulate different individuals based on one exported \*.pkml simulation. This functionality is only available when PK-Sim is installed on the system.

The easier way to get started is to install the OSPSuite Setup. This will link PK-Sim to your ospsuite-R installation automatically. If the portable version of PK-Sim is used installed, one must specify the path to the PK-Sim folder by calling the function `initPKSim`.

### Creating individuals

The physiology of an individual is defined by the values of the simulation parameters. To simulate a specific individual, one has to generate a set of parameter values and apply these values to the model. **NOTE**: Currently, only individuals of the _same_ species as in the original \*.pkml simulation can be applied. I.e., if the simulation exported from PK-Sim represents a human individual, it is possible to simulate another human individual of different race, gender, etc., but it is not possible to simulate a rat. Though it is technically possible, and the simulation will produce some results, these will not valid.

The first step is creating an object describing _individual characteristics_. To see the list of available values for the arguments `species`, `population` \(only for human\), and `gender` \(only for human\), use the enums `Species`, `HumanPopulation`, and `Gender`, respectively. This object is then passed to the function `createIndividual` to generate a set of parameter values. The algorithm behind is the same used in PK-Sim when creating an Individual-Building Block.

```text
library(ospsuite)

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
```

The output contains two lists of parameters - `distributedParameters` and `derivedParameters`. The first list contains parameters that differ between the individuals of the selected species, while the second list mostly consists of values of parameters defined by formulas in the simulation. When applying the generated individual parameter set to a simulation in R, only parameters from the `distributedParameters` should be overwritten, otherwise formula dependencies may be destroyed. Generated parameter values can be conveniently applied using the `setParameterValuesByPath` method:

```text
library(ospsuite)

# Load simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

# Apply individual parameters
setParameterValuesByPath(parameterPaths = individual$distributedParameters$paths,
                         values = individual$distributedParameters$values,
                         simulation = sim)
```

### Adding enzyme ontogenies

The PK-Sim database includes ontogeny information for some proteins \(see [PK-Sim Ontogeny Database](https://github.com/Open-Systems-Pharmacology/OSPSuite.Documentation/blob/master/PK-Sim%20Ontogeny%20Database%20Version%207.3.pdf)\). For a protein molecule present in the simulation, it is possible to add the ontogeny information on one of the pre-defined proteins. For example, it is possible to set the ontogeny of the protein `MyProtein` to the value of the ontogeny of a CYP3A4 enzyme for the specified individual. The list of supported ontogenies is stored in the `StandardOntogeny`-list.

```text
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
```

## Working with population simulations

### Population simulations

Population simulations can be easily performed in R by combining the simulation loaded from a \*.pkml file with the population information created in PK-Sim and exported to CSV format \(for details, please refer to [Creating Populations](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-creating-populations)\) or created directly in R \(see [Creating populations](r-introduction.md#creating-populations)\).

#### Loading population file

The method `loadPopulation` creates an object of the `Population` class that can be passed to the `runSimulation` method \(see [Running simulations and retrieving the results](r-introduction.md#running-a-simulation)\).

```text
library(ospsuite)
# Load population information from csv
popFilePath <- file.path(getwd(), "..", "tests", "data", "pop_10.csv", fsep = .Platform$file.sep)
myPopulation <- loadPopulation(csvPopulationFile = popFilePath)
print(myPopulation)
#> Population: 
#>   Number of Individuals: 10
```

### Creating populations

Similar to creating individual parameter sets \(see [Creating individuals](r-introduction.md#creating-individuals)\), a population is created from _population characteristics_ created by calling the method `createPopulationCharacteristics`. To see the list of available values for the arguments `species` and `population` \(only for human\), use the enums `Species` and `HumanPopulation`, respectively. The returned object of type `PopulationCharacteristics` is then passed to the function `createPopulation` to generate a set of parameter values. The algorithm behind is the same used in PK-Sim when creating an population. Molecule ontogenies can be added as described in [Creating individuals](r-introduction.md#creating-individuals).

```text
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
myPopulation <- createPopulation(populationCharacteristics = populationCharacteristics)
print(myPopulation)
#> Population: 
#>   Number of Individuals: 50
```

### Running population simulation

To run a population simulation, the `Population` object created by the `createPopulation` method must be passed to the `runSimulation` method:

```text
library(ospsuite)

# Load simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

# Run population simulation
simulationResults <- runSimulation(simulation = sim, population = myPopulation)
print(simulationResults)
#> SimulationResults: 
#>   Number of individuals: 50
```

Population simulations are run in parallel on multi-core machines - one core simulates a subset of all individuals defined in the population. By default, the number of cores used equals the maximal number of logical cores available minus one. The user can change the default behavior by providing custom `SimulationRunOptions`.

```text
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
```

Simulated time-value pairs for a specific output from the `SimulationResults`-object returned by the `runSimulation` method can be accessed with the method `getOutputValues`. The user can provide either the path\(s\) of the output \(which can be a molecule, a parameter, or an observer\), or the object\(s\) of the type `Molecule`, `Parameter`, or `Quantity` \(for observers\) with the argument `quantitiesOrPaths`. If no output is specified, all outputs available in the simulation results are returned. The paths of all available outputs can be accessed via

```text
populationResults$allQuantityPaths
#> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"
```

`getOutputValues` returns a list with two entries: `data` and `metadata`:

* `data` is a dataframe with two predefined columns \(IndividualId and

  Time\) as well as one column for each requested output

* `IndividualId`
  * `Time` a vector with simulated time values \(in minutes, equal

    for all outputs\)

  * a vector with simulated entries for each output requested.
* 
The values of `IndividualId`, `Time`, and the simulated outputs, are appended for each simulated individual. Note that this results in non-monotonously increasing column `Time`.

```text
# Get simulated results by path
resultsPath <- populationResults$allQuantityPaths[[1]]
print(resultsPath)
#> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

resultsData <- getOutputValues(populationResults, quantitiesOrPaths = resultsPath)

resultsTime <- resultsData$data$Time
resultsValues <- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

plot(resultsTime, resultsValues, type = "l")
```

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEgCAMAAAAjXV6yAAAAV1BMVEUAAAAAADoAAGYAOjoAOpAAZrY6AAA6ADo6AGY6kNtmAABmADpmkJBmtrZmtv+QOgCQZgCQkGaQ2/+2ZgC2/7a2///bkDrb////tmb/25D//7b//9v///+Z3c74AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAHx0lEQVR4nO2djXajKBiG7WyS3WR20t26Y0zq/V/nCv5FE3g/EQol73POtJ0UQZ8ioHxo0RArRewdSB0KAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFATwLKj4NsQS5De7cFAQgIIAsQUlL4qCABQEoCBAZEHyYUYsHATdTsemKordxUO5WQoqd5frYd+Ue5fiFgPUHAXdTuemLtp/P35vLzdXQWUrp6IgQ8JyfzvtLreTyym2zC5LQbdT8fbx+b7JT9aCfJZLQSC7PAW159juUh59lJuloPrto1KN9CZDGQv6fG8H0u0wmt28IaEaBylBHCgaEg41qLRdjH2+dxcURokZC+rboKq92jBSFX0DVReGlipnQaoXK9qxojmtqmQ9laGeZS0IopqpHlNL9dqCXrsG6RPM2gCrNqivQq/ZBmnsvfxg0djT5S/I7Y7iMrucBTkNFF/hluuA9VKjLIq9HiyaBkv5C7LeUdQj7WLfzYDYsstREGx/+26+1kPJF+zmBeiBYtdGcaD4DNYgxNgG3Y2pn2aXnaBxGG0fSbMX81UuBYHsshQ0nGa85WpIWO4u1b65Hix3FMXZ5ShIDY5rNauxKUAoa0Hn5vrXb/1vc7k5ClJDm9vPDwoyJlSX8eWRp5g5YblXPdmmTixvQR7LzU7Q3YSOl3IzFFQU20LL5uVmJ6ibdbfNqoJcXuKetKpG28Kncq5BHfXGS7HsBTWO0z7L7FasCY2Eew3ytFYjR0Fe26DsBG3rxZbZZSfI/zgoO0G+R9KZCfJdbpaC/K44zFCQZMWhPAw4P0GSFYcrwoDzFARWHK4J4sxPkGDF4Zow4AwF4RWHL16DBKwIA85PkJryUViv5uVhwPkK8rReLDdB5XTT1OWC/vGWa+qG3GuQAEuAQ8aCBAji0F5b0NB5vWANksYoqqHkSwqSU759UJCV9oL1NQVJFtRproc/RILSNuRcgwTTYp/v5pXR+QvytaAudUPxZ1azFeTrWixxQ86CfD2iS+nJS5BgQZ08u6JJ3VDsebFeULqGkhCUsqHYE4dDP5asoUATh9LstKCkO/swE4fi7MY2KFlDQSYO5dlNbVCqhoJMHFpyWd6Tnr9gwyHH0ASZOJRnNwlKtRKl0c3fGUpNUXRBs3MswWrkIsjno0rnghJsjBwEeX1U6XNBCc24rhfk91GlhhqUjiO3cZC/R5U2RkOJnGvuNcj6qFJpdkhQ/GkP5zbI+qhScXb6m11P5Jrk2IttXo5QzL9ZzrDIkuKPg/of4IkWyZJbG+St3LvirYoeK9ZX4daLeSt3VvwaRV8myqWR3rYY8z675SGuVxTcVMC5eUF2j0fmrCiUrECNtHCtxvOj8SDJn68wgqRrNcy771fSBmtBBIkj7VGmgTVJLAYRZF6rsSw9acIJkq/VSJ9QbZBwrUb6BOrFpGs10ifytVj6RBP0bYgkyJbp5k8DZWuHggAUBKAgAAUBKAhAQQAKAlAQ4NtcG8SCggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFAfwLqkWRoF208ZjWuFFV9O8LxEmfMr2qSFriAu+C1Fs0a1h0rSdnx7TGjSr1C2UIJ33K7TREWUhLXOJbUBfggBa+6nUzU1rjRt3ytfsUsvwHprc8SEt8wLeg7tlCaMFHtfun3d0xrXGjURBO+oy6OA5xOtISH/Au6E9VbUFAaJtItQhjWvNGwykmSPqcPqW8xCW+BXXntf3sVvVb7e6Y1rJR35ZKkj7fH+1gTYkLYgga1swIdletw74ejlsFrShxSYRTTCeRVfipzdh0iq0o8YEIjXTVB6CccZM5/qHdGummd7CixAfidPPd3xN3ut1xtAfp2M3fVxJZiQ9EGih241o8bBvaINeB4kJQAgNFXZ/FlxpjWuNG6jHFx0aU9CkLQeuz4cUqgIIAFASgIAAFASgIQEEACgJQEICCABQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFARIV5B+0cd5+l8fwvLjPy9PxBSTtKDF00G7qKcvhoIAMQXdfv6rwpirPsLletBR9dqKtvP3QT0MrP+4GQSp318Pv9pT7qh+pSPFCrd3eEuIKki/97fSr7Y9dtFkdXGeBJ07F93HzVxQu1FV9G/aGXIIQlxBx/6LinOqx5j4maC7QMt7Qcdm+HIecwiyk3EFnYc4TX2c3SEuBE2rLWaCzs34ZcwhyE7GFzREoHZP0j0vBQ0fN2ZBYw4hiC9oFilYvn0sBfUfN6AGhSK6oHlXrq0MTcskqPvBIMjPs9RNRBek+yBVRYbo3M/33UW9Trp3NQbtGgWNOQTZyfiC9ChGNcSqLVFHqa4qfnXVp2zHQcPHZkFjDiFIdySdCBQEoCAABQEoCEBBAAoCUBCAggAUBKAgAAUBKAhAQQAKAlAQgIIAFASgIAAFASgIQEEACgJQEOB/6MEnM0nJQTYAAAAASUVORK5CYII=)

To get the results for a specific individual or a set of individuals, the argument `individualIds` of the method `getOutputValues` can be specified:

```text
# Get simulated results by path
resultsPath <- populationResults$allQuantityPaths[[1]]
print(resultsPath)
#> [1] "Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)"

#Get only the results for individuals with IDs 1 and 2
resultsData <- getOutputValues(populationResults, quantitiesOrPaths = resultsPath, individualIds = c(1, 2))

resultsTime <- resultsData$data$Time
resultsValues <- resultsData$data$`Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)`

plot(resultsTime, resultsValues, type = "l")
```

![](data:image/png;base64,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)

For more information about running simulations, please refer to [Running simulations and retrieving the results](r-introduction.md#running-a-simulation).

## Calculating PK parameters of simulation outputs

PK parameters such as AUC, C\_max, etc., can be calculated for all outputs of a simulation. First, simulation results must be calculated, and the `SimulationResults` object is then passed to the method `calculatePKAnalyses`. For the list of calculated PK parameters and their description, please refer to [PK-Analysis view‌](https://docs.open-systems-pharmacology.org/working-with-pk-sim/pk-sim-documentation/pk-sim-simulations#pk-analysis-view).

```text
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
```

The function `calculatePKAnalyses` returns an object of the class `SimulationPKAnalyses`, which allows to retrieve either a certain PK parameter for an output path, or all calculated PK parameters for an output path.

The methods `$allPKParametersFor` and `$pKParameterFor` return a object \(or a list of objects\) of the class `QuantityPKParameter`, with the fields `$name` which is the name of the pk-parameter \(e.g. “C\_max”\), `$quantityPath` the path of the output the parameter has been calculated for, and `$values` the value \(or list of values for a population simulation\).

```text
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
```

In case of a population simulation, `$values` return a list of values calculated for each individual.

### Import and export of PK-analyses

Population analysis calculated in R can be exported to a \*.csv file and loaded in PK-Sim, and vice versa.

```text
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
```

## Sensitivity analysis

The models built with OSPS depend on a lot of input parameters which are based on literature values, measurements, databases, assumptions. For a given set of input parameters a number of output curves is computed in a simulation. To assess which input parameters have most impact on the output curves, a sensitivity analysis of the simulation can be performed. For more information about theoretical background, see [Sensitivity Analysis](https://docs.open-systems-pharmacology.org/shared-tools-and-example-workflows/sensitivity-analysis).

In brief, the values of the chosen parameters are changed by a certain percentage and the impact of these changes on PK parameters of model outputs is assessed.

### Performing a sensitivity analysis

The first step of performing a sensitivity analysis is creating an object of the class `SensitivityAnalysis`. At this step, the user can define which parameters should be considered for the sensitivity analysis, in which range the values are varied, and how may steps are performed in one direction \(plus and minus\). If no parameters are specified, all constant and suitable for sensitivity calculations parameters of the simulation will be variated. The list of such parameters paths for a simulation can be accessed with the method `potentialVariableParameterPathsFor(simulation)`.

```text
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
```

New parameters can be added to an existing `SensitivityAnalysis` by calling the method `addParameterPaths`. WARNING: If no parameters were specified during the creation of a `SensitivityAnalysis` \(all constant and suitable for sensitivity calculation parameters are considered\), calling `addParameterPaths` will only vary the newly added parameters.

```text
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
```

To run the specified `SensitivityAnalysis`, call the method `runSensitivityAnalysis`. The method returns an object of the class `SensitivityAnalysisResults`. The impact of the defined parameters is calculated for PK-Parameters \(see [PK Analysis](r-introduction.md#calculating-pk-parameters-of-simulation-outputs) for more information\) of all model outputs.

```text
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
```

The method `allPKParameterSensitivitiesFor` returns a list of `PKParameterSensitivity` objects. `PKParameterSensitivity` describes the sensitivity \(field `$value`\) of a PK-Parameter \(`$pkParameterName`\) for the output `$outputPath` calculated for the varied parameter `$parameterPath`. The argument `totalSensitivityThreshold` of the method `allPKParameterSensitivitiesFor` is used to filter out the most impactful parameters. A threshold of 0.9 means that only parameters participating to a total of 90 percent of the sensitivity would be returned. A value of 1 would return the sensitivity for all parameters. If no value is provided, a default value is used.

```text
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
```

The value `-1` for the sensitivity of “AUC\_inf” of the output `Organism|PeripheralVenousBlood|Aciclovir|Plasma (Peripheral Venous Blood)` for the parameter `Organism-Kidney-Volume` means that increasing `Organism-Kidney-Volume` by 10% will decrease “AUC\_inf” by 10%. Note that the list of sensitivities is ordered from largest to smallest with respect to magnitude.

### Import and export of sensitivity analysis results

Sensitivity analysis calculated in R can be exported to a \*.csv file, which can be loaded in another instance.

```text
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
```

## Table parameters

Parameters defined by a **table formula** have special syntax of retrieving and changing the values. The value of a table parameter is given by a list of `ValuePoint` objects, each `ValuePoint` being an x-y value pair. X values usually refer to the simulation time.

```text
library(ospsuite)

# Load a simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)

#Get the parameter defined by a table.
tableParam <- getParameter("Organism|TableParameter", sim)
print(tableParam)
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 0.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE
```

Direct access to the value points is possible through the `TableFormula` of the table parameter. All x- or y-values stored in the table can be conveniently retrieved using the `lapply` method:

```text
library(ospsuite)
#Get the parameter defined by a table.
tableParam <- getParameter("Organism|TableParameter", sim)
print(tableParam)
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 0.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE

# Get all value points
tableParam$formula$allPoints
#> [[1]]
#>   x= 0, y= 0, restartSolver= FALSE
#> 
#> [[2]]
#>   x= 60, y= 1, restartSolver= FALSE
#> 
#> [[3]]
#>   x= 120, y= 2, restartSolver= FALSE
#> 
#> [[4]]
#>   x= 180, y= 3, restartSolver= FALSE

# Get all x-values
xValues <- lapply(tableParam$formula$allPoints, function(point){point$x})
print(xValues)
#> [[1]]
#> [1] 0
#> 
#> [[2]]
#> [1] 60
#> 
#> [[3]]
#> [1] 120
#> 
#> [[4]]
#> [1] 180

# Get all y-values
yValues <- lapply(tableParam$formula$allPoints, function(point){point$y})
print(yValues)
#> [[1]]
#> [1] 0
#> 
#> [[2]]
#> [1] 1
#> 
#> [[3]]
#> [1] 2
#> 
#> [[4]]
#> [1] 3
```

The method `valueAt` of the `TableFormula` returns the value of `y` for the given `x`. If no entry exists for the `x`, the value `y` is linearly interpolated between the two closest `x` values.

```text
library(ospsuite)
#Get the parameter defined by a table.
tableParam <- getParameter("Organism|TableParameter", sim)

# Value at x = 60 is stored in the table
tableParam$formula$valueAt(60)
#> [1] 1

# Value at x = 90 is not in the table
tableParam$formula$valueAt(90)
#> [1] 1.5
```

### Changing table parameter values

Simply setting the value of a table-defined parameter using `setParameterValues` will override the formula and make the parameter constant.

```text
library(ospsuite)
#Get the parameter defined by a table.
tableParam <- getParameter("Organism|TableParameter", sim)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 0.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE

# Set value to a constant. tableParam$isFixedValue is now TRUE
setParameterValues(tableParam, 10)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE
```

To change the values of the table, a set of methods of the `TableFormula` is available. The method `addPoints` adds a set of x-y values to the existing table. If trying to add a point with the x-value already present in the table, an error is thrown:

```text
library(ospsuite)

tableParam <- getParameter("Organism|TableParameter", sim)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

# Add new points
tableParam$formula$addPoints(c(1, 2, 3), c(5, 6, 7))
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

#Try to add points with existing x-values
tableParam$formula$addPoints(0, 1)
#> Error in rClr::clrCall(self$ref, "AddPoint", xValues[i], yValues[i]): Type:    OSPSuite.Core.Domain.ValuePointAlreadyExistsForPointException
#> Message: A point for x=0 was already added with y=1
#> Method:  Int32 AddPoint(OSPSuite.Core.Domain.Formulas.ValuePoint)
#> Stack trace:
#>    at OSPSuite.Core.Domain.Formulas.TableFormula.AddPoint(ValuePoint point)
#>    at OSPSuite.Core.Domain.Formulas.TableFormula.AddPoint(Double x, Double y)
```

To remove a point from the table, use the method `removePoint`. It remove a point if the x value is present in the table and has the provided y.

```text
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 0, y= 0, restartSolver= FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

# Remove the point (0, 0)
tableParam$formula$removePoint(0, 0)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

# Try to remove the point (1, 1). Note that the value for x = 1 is x = 5 in the original table,
# and no point is removed.
tableParam$formula$removePoint(1, 1)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

# Try to remove a non-existing point (0, 1). No point is removed.
tableParam$formula$removePoint(1, 1)
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE
```

The method `clearPoints` removes all points from the table. `setPoints`is a combination of clearing the table and adding new points:

```text
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 60, y= 1, restartSolver= FALSE
#>   x= 120, y= 2, restartSolver= FALSE
#>   x= 180, y= 3, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE

tableParam$formula$setPoints(c(1, 2, 3, 4), c(5, 6, 7, 8))
tableParam
#> Parameter: 
#>   Path: Organism|TableParameter
#>   Value: 10.00
#>   isTable: TRUE
#>   XDimension: Time
#>   UseDerivedValues: FALSE
#>   x= 1, y= 5, restartSolver= FALSE
#>   x= 2, y= 6, restartSolver= FALSE
#>   x= 3, y= 7, restartSolver= FALSE
#>   x= 4, y= 8, restartSolver= FALSE
#>   Value overrides formula: TRUE
#>   isStateVariable: FALSE
```

## Dimensions and Units

### Unit conversion

Every entity - a molecule, a parameter, or an observer - has a certain dimension, like _Amount_, _Concentration_, or _Volume_. The dimension is a property of an entity:

```text
library(ospsuite)
# Load a simulation
simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
sim <- loadSimulation(simFilePath)
print(sim)
#> Simulation: 
#>   Name: Vergin 1995 IV
#>   Source file: C:/Users/appveyor/AppData/Local/Temp/1/RtmpY9evoZ/Rbuildce052b82d20/ospsuite/vignettes/../tests/data/Aciclovir.pkml

#Get the parameter volume of the liver.
livParam <- getParameter("Organism|Liver|Volume", sim)
print(livParam)
#> Parameter: 
#>   Path: Organism|Liver|Volume
#>   Value: 2.1675 [l]
#>   isDistributed: TRUE
#>   isStateVariable: FALSE

# Dimension of the parameter
livParam$dimension
#> [1] "Volume"
```

The values of a certain dimension can be presented in different units - for example, _l_ or _ml_ for the dimension _Volume_, or _mol_ and _µmol_ for the dimension _Amount_. The list of all available units is a method of an entity:

```text
# Dimension of the parameter
livParam$dimension
#> [1] "Volume"
# Units of the parameter
livParam$allUnits
#> [1] "l"  "ml" "µl"
```

Internally, `OSPS` works with the **base units**, and all the values that are shown or passed to functions are in base units by default. These base units are often different from the units that are displayed by default in PK-Sim \(and MoBi\). The list of base and default display units can be found in the [documentation](https://docs.open-systems-pharmacology.org/appendix/appendix).

As an example, the parameter **BMI** is given in the default unit `kg/dm²`, while the default display unit is the more convenient `kg/m²`. The `ospuite-R` package provides a set of methods for conversion between different units. The methods `toUnit`, `toBaseUnit`, and `toDisplayUnit` require the quantity to get the correct dimension and units; however, it does not change the value of the quantity!

```text
# Get the BMI parameter
bmiParam <- getParameter("Organism|BMI", sim)
print(bmiParam)
#> Parameter: 
#>   Path: Organism|BMI
#>   Value: 0.23436 [kg/dm²]
#>   isFormula: TRUE
#>   formula: Height>0 ? BW / (Height)^2 : 0
#>   Value overrides formula: FALSE
#>   isStateVariable: FALSE

# Print the base and the default display units
bmiParam$unit
#> [1] "kg/dm²"
bmiParam$displayUnit
#> [1] "kg/m²"

# Convert the value from the base into the default display unit
toDisplayUnit(quantity = bmiParam, values = bmiParam$value)
#> [1] 23.43633

# Convert the value to the base unit, that can be used e.g. for setting new parameter value
toBaseUnit(quantity = bmiParam, values = 30, unit = "kg/m²")
#> [1] 0.3

liverVolume <- getParameter("Organism|Liver|Volume",sim)

print(liverVolume)
#> Parameter: 
#>   Path: Organism|Liver|Volume
#>   Value: 2.1675 [l]
#>   isDistributed: TRUE
#>   isStateVariable: FALSE
liverVolume$allUnits
#> [1] "l"  "ml" "µl"
# Convert from base volume unit to µl
toUnit(quantity = liverVolume, values = c(1,2,3,4), targetUnit = "ml")
#> [1] 1000 2000 3000 4000
```


# Matlab® - Introduction‌

## About the Toolbox‌

The MoBi® Toolbox for Matlab® is a collection of Matlab® functions, which allows for the processing of models developed in MoBi® from within Matlab®. For example, the Matlab® environment can be used to change parameters in a model developed in MoBi®, simulate the model, and analyze the results. This allows for an efficient operation in the model analysis stage, using the programming options as well as the function library available within Matlab® in combination with the powerful modeling interface and solver kernel included in MoBi®. In addition, the toolbox offers efficient analysis methods tailored to the needs of systems biology and PBPK modeling including parameter identification and optimization. The Toolbox can be found under Program Files (x86)/Open Systems Pharmacology/Mobi Toolbox for Matlab.

## Typical Matlab script to evaluate PK-Sim PBPK Models‌

The MoBi® Toolbox for Matlab® offers convenient access to PBPK and systems biology models developed in MoBi® or PK-Sim®.

A Matlab® code to analyze a MoBi® model typically contains the following steps:

1.  Initialize the MoBi model.
    
2.  Set parameters.
    
3.  Simulate model
    
4.  Analyze results
    
5.  Store modified model or reset.
    
The steps 2-4 are often repeated in an iterative manner, as can also be automated using the Matlab® programming options.

Even though Matlab® scripts can be programmed from scratch, it is recommended to execute **generateMatlabCodeForXML** on first usage. This will open a Graphical User Interface (GUI) which allows you to:

*   select a MoBi® model (xml) file,

*   select parameters of the model to be initialized in order to vary them from within Matlab®.

*   select entities to be retrieved after simulation, e.g. the drug plasma concentration.

Pressing the 'OK' button generates a Matlab® executable M-file, which contains the necessary Matlab®commands for executing the selected MoBi® model manipulations and evaluations.

The file is ideally suited for non-experts to start generating executable Matlab®\- scripts for MoBi® model handling as it will reveal the necessary M-file structure.

In the following, the possibilities for communication between MoBi® and Matlab® are summarized. For further details, please see the M-file help, which is available for each function of the Toolbox from within Matlab®.

## Initialization‌

### MoBiSettings‌
    
First, **MoBiSettings** have to be called in order to set the version of the MoBi- Matlab port. The version of the SimModel Component is passed as a parameter.

For further details, see the M-file help in Matlab®.

### InitSimulation‌

To initialize the MoBi® model, use the **initSimulation** function. This initializes the respective XML files. The first input parameter determines the model to be chosen. If you would like to change parameters before the actual simulation, these are best initialized beforehand and passed to **initSimulation** using a structure.

For further details, see the M-file help in Matlab®.

### Initialize parameters‌

If you call **initSimulation** with a parameter structure, the following functions can add parameters to the structure before initializing the simulation.

**initParameter** adds a parameter

**initSpeciesInitialValue** adds an initial value of a species
    
## Manipulate parameters‌

In the following, different functions are listed, which allow checking the existence of a parameter as well as getting and changing its value. Most functions come in two versions to distinguish the different types of parameters, i.e., _parameter_ and _species initial value_.

There are three kinds of parameters:

*   Readonly All parameters exist as read only parameter, the values can be read but not be varied.

*   Variable Parameters, which are set to variables during the initialization. The values can be read and varied.

*   Reference For every variable parameter a reference parameter exists. Variable parameters can be set relative to this reference parameter. The values of reference parameter can be varied.

For further details on the functions, please consult the M-file help available within Matlab®.

### Check Parameter existence‌

The following, functions allow you to check for the existence of a certain parameter (in the specified model, simulation, level):

**existsParameter** Checks the existence of a parameter and returns its description.

**existsSpeciesInitialValue** Checks the existence of a species initial values and returns its description.

### Get parameter values‌

The following functions allow you to check for the current parameter values.

**getParameter** Returns the value and other properties of a parameter.

**getSpeciesInitialValue** Returns the value and other properties of a species initial value.

### Set relative parameter values‌

The following functions allow you to change the value of an initialized parameter by changing the parameter value relative to the default.

**setRelativeParameter** Sets the value of a variable parameter relative to reference.

**setRelativeSpeciesInitialValue** Sets the value or scale factor of a specific species relative to reference.

### Set all parameter values‌

The following functions allow you to get and set the value of all initialized parameter simultaneously.

**setAllParameters** Sets all parameter values of one type (source) to the values of another type (target).

**getParameterStatus** Saves values of the given parameter type in the variable parameterStatus.

**setParameterStatus** Sets the previously stored values of the given parameter type.

### Table parameters‌

The following functions allow you to get and set the table of table parameters. 

**setTableParameter** Sets the table for a specific parameter. 

**getTableParameter** Retrieves the table of a specific parameter.

To get a value vector for a specified time profile with interpolated values taken from the table please use the **getParameter** function with a time profile parameter.

## Observer‌

Observer can not be changed, but you can check for existence or properties

**getObserverFormula** Returns the formula and other properties of an observer.

**existsObserver** Checks the existence of an observer and returns its description array.

## Time pattern‌

For a simulation a time pattern is defined. These are the points where the simulated results of species time profiles and observer time profiles are stored and made available for the user.

**getSimulationTime** Returns the time vector, unit of time and a cell array with the description of the time pattern.

**setSimulationTime** Sets the simulation time.

## Simulation‌

After the model has been initialized, and optionally parameters have been changed, the model can be simulated using **processSimulation**.

## Analysis‌

The following functions can only be executed after **processSimulation** has been executed. The functions enable the evaluation of the simulation results.

**getSimulationResult** gets the time curve of Species and Observers

**getPKParameters** Gets PK parameters of the time profile of a species or observer specified by path_id.

**getPKParametersForConcentration** Gets PK parameters of a time profile.

## How to get help‌

In the following some additional useful commands are given:

**MoBi** or **help '<ToolboxInstallationDirectory>'**, e.g. **help 'MoBi Toolbox for Matlab, help <\function name>**

Access the help within the command window for a specific function. If the function is located in a subfolder of the Toolbox, you might have to change into that folder, as it might not be included in your search path.

If you experience problems viewing the MoBi® help files in the help browser, try the following within Matlab® Start -> Desktop Tools -> View Source Files -> Refresh Start button, whereby the Start menu refers, to the one in the lower left corner of Matlab®, not Windows.
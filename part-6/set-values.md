Changing parameter and molecule start values
============================================

Changing initial values
-----------------------

It is possible to change the initial values of all parameters and
molecules in a simulation. It is important to differentiate between the
*constant* values and the values that are defined by a *formula*.

### Formula types

Every (initial) value is described either by a constant or by a formula.
If the value is defined by a simple constant, the field `isConstant` of
the respective parameter or molecule has the value `TRUE`.

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

If the value is not constant, it is described by one of the formula
types:

**Distributed**: Distributed parameters describe a variation around a
constant value or between two numerical limits. In the simulation, the
behavior equals that of constant values. See [OSPS
documentation](https://docs.open-systems-pharmacology.org/working-with-mobi/mobi-documentation/model-building-components#working-with-constant-and-distributed-parameters)
for more information.

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

**Explicit formula**: The value of the parameter is given by an explicit
formula. The value of an explicit formula can change during the
simulation. The string of the formula can be accessed via
`parameter$formulaString`.

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

**Table formula**: The value of the parameter is given by a table with
x-y value pairs. X values usually refer to the simulation time. See
[Table parameters](table-parameters.md) for additional information on
how to retrieve or change the table values.

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

Additionally, some parameters are modeled as *state variables*. In this
case, the parameter has an *initial value* and a *right hand side (RHS)*
formula, both of which can be any formula type.

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

### Changing parameters and molecules initial values

The user can change initial values of parameters and molecules with the
methods `setParameterValues` and `setMoleculeInitialValues`,
respectively.

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

Another way to change parameter values is to scale them. The scaling is
always performed relative to the current value:

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

Only constant values can be set. If the parameters value is defined by a
formula (explicit or table), the newly assigned value will override the
formula. This will be reflected by the field `isFixedValue`. Changing
values of formula parameters should be done with caution, as the
potential dependency on another simulation parameters will be destroyed.

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

The parameter value can be reset to its formula after assigning a
constant value:

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

Changing the value of a state variable parameter will only change its
initial value, but not the right hand side (i.e., the value in the
simulation will still change according to the rhs formula). To switch to
RHS formula off and, by that, make the parameter be only dependent on
its initial value, the field `isStateVariable` can be set to `FALSE`.
This function is one-way only! It is not possible to re-activate the RHS
formula after switching it off.

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

An example how to set the initial values of molecules in all containers
to a certain value:

    # Get objects representing the molecule Aciclovir in all containers
    allAciclovirMolecules <- getAllMoleculesMatching("Organism|**|Aciclovir",sim)

    #Set initial values to 10 µmol in all containers
    setMoleculeInitialValues(allAciclovirMolecules, rep(10, length(allAciclovirMolecules)))

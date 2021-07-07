Dimensions and Units
====================

Unit conversion
---------------

Every entity - a molecule, a parameter, or an observer - has a certain
dimension, like *Amount*, *Concentration*, or *Volume*. The dimension is
a property of an entity:

    library(ospsuite)
    # Load a simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

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

The values of a certain dimension can be presented in different units -
for example, *l* or *ml* for the dimension *Volume*, or *mol* and *µmol*
for the dimension *Amount*. The list of all available units is a method
of an entity:

    # Dimension of the parameter
    livParam$dimension
    #> [1] "Volume"
    # Units of the parameter
    livParam$allUnits
    #> [1] "l"  "ml" "µl"

Internally, `OSPS` works with the **base units**, and all the values
that are shown or passed to functions are in base units by default.
These base units are often different from the units that are displayed
by default in PK-Sim (and MoBi). The list of base and default display
units can be found in the
[documentation](https://docs.open-systems-pharmacology.org/appendix/appendix).

As an example, the parameter **BMI** is given in the default unit
`kg/dm²`, while the default display unit is the more convenient `kg/m²`.
The `ospuite-R` package provides a set of methods for conversion between
different units. The methods `toUnit`, `toBaseUnit`, and `toDisplayUnit`
require the quantity to get the correct dimension and units; however, it
does not change the value of the quantity!

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

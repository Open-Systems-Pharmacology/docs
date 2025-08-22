library(ospsuite)
library(xml2)

# Read xml
dimensionsXML <- xml2::read_xml(system.file("lib", "OSPSuite.Dimensions.xml", package = "ospsuite"))
dimensionsList <- as_list(dimensionsXML)

outputString <- paste("Dimension", "Base unit", "Deviating default display unit", sep = " | ")
outputString <- paste(outputString, "\n", paste("---", "---", "---", sep = " | "), sep = "")

# Iterate through nodes
for (dimension in dimensionsList$DimensionFactory$Dimensions){
  name <- attr(dimension, "name")
  baseUnit <- attr(dimension, "baseUnit")
  displayUnit <- attr(dimension, "defaultUnit")
  # If no display unit is specified, use the base unit
  displayUnit <- displayUnit %||% baseUnit

  outputString <- paste(outputString,
                        paste(name, baseUnit, displayUnit, sep = " | "),
                        sep = "\n")
}

cat(outputString)

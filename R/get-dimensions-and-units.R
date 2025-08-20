library(ospsuite)

allDimensions <- names(ospsuite::ospDimensions)

baseUnits <- list()
displayUnits <- list()


outputString <- paste("Dimension", "Base unit", "Deviating default display unit", sep = " | ")
outputString <- paste(outputString, "\n", paste("---", "---", "---", sep = " | "), sep = "")
for (dimension in allDimensions) {
  baseUnits[[dimension]] <- getBaseUnit(dimension)
  displayUnits[[dimension]] <- getBaseUnit(dimension)
}

cat(outputString)

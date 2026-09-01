## The ospsuite package

The **ospsuite** package (repository *OSPSuite-R*) provides the functionality of loading, manipulating, and simulating the simulations created in the software tools PK-Sim and MoBi. Starting with version 13, it also offers a MoBi® interface for scripted work with MoBi projects, modules, and building blocks (e.g. `loadMoBiProject`, `createMoBiModule`, `loadModuleFromPKML`, `createIndividualBuildingBlock`, `createExpressionProfileBuildingBlock`).

The documentation of the package can be found here:
[https://www.open-systems-pharmacology.org/OSPSuite-R/](https://www.open-systems-pharmacology.org/OSPSuite-R/)


## Installing the ospsuite package
The package requires R version 4.4 or higher (64bit). Installation instructions are provided here:
[https://www.open-systems-pharmacology.org/OSPSuite-R/#installation](https://www.open-systems-pharmacology.org/OSPSuite-R/#installation)


## Articles
Specific workflows and details regarding the ospsuite package can be found here:
[https://www.open-systems-pharmacology.org/OSPSuite-R/articles/](https://www.open-systems-pharmacology.org/OSPSuite-R/articles/)

A typical scripted simulation workflow uses the following functions:

| Step | Functions |
| --- | --- |
| Load a simulation exported to `*.pkml` | `loadSimulation` |
| Find and modify model entities | `getParameter`, `getAllParametersMatching`, `setParameterValues`, `getMolecule`, `getAllMoleculesMatching` |
| Define the simulated outputs | `addOutputs`, `clearOutputs` |
| Run one or several simulations | `runSimulation`, `runSimulations` |
| Calculate PK parameters | `calculatePKAnalyses`, `pkAnalysesAsDataFrame` |
| Combine simulated and observed data for plotting | `DataCombined`, `DefaultPlotConfiguration`, `plotIndividualTimeProfile`, `plotPopulationTimeProfile` |
| Create individuals and populations | `createIndividual`, `createPopulation` |
| Work with MoBi projects and building blocks | `loadMoBiProject`, `createMoBiModule`, `loadModuleFromPKML`, `createIndividualBuildingBlock`, `createExpressionProfileBuildingBlock` |


## References
The list of functions defined in the package can be found here: 
[https://www.open-systems-pharmacology.org/OSPSuite-R/reference/](https://www.open-systems-pharmacology.org/OSPSuite-R/reference/)

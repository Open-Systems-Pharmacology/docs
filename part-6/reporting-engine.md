## Reporting Engine

The **Reporting Engine (RE)** package `ospsuite.reportingengine` provides the functionality to create reports for the Open Systems Pharmacology models (e.g. _Qualification Reports_, see [Qualification](../part-5/qualification.md)).

Reports are defined by a *workflow* object: `MeanModelWorkflow` for individual (mean model) simulations, `PopulationWorkflow` for population simulations, and `QualificationWorkflow` for the qualification workflow driven by a qualification plan. Each workflow consists of tasks (e.g. simulation, PK-parameter calculation, sensitivity analysis, and the various plot tasks) that can be activated or inactivated individually.

The package requires R version 4.4 or higher (64bit).

The documentation of the package can be found here:
[https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/](https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/)


## Articles
Specific workflows and details regarding the **RE** package can be found here:
[https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/articles/](https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/articles/)


## References
The list of functions defined in the package can be found here: 
[https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/reference/index.html](https://www.open-systems-pharmacology.org/OSPSuite.ReportingEngine/reference/index.html)


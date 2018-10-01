# Modular Structure‌

The modular architecture of the software platform is outlined below.

Apart from the two central, graphical user interface (GUI) based software tools PK-Sim® and MoBi®, the software platform has a common core, import and export options, as well as interfaces to general computing environments, as detailed in the following.

![Modular structure of the software platform (taken from \[[18](../references.md#18)\])](../assets/images/part-2/Eissing_et_al_Frontiers_2011_Figure2.jpg)

## Common XML and solver core‌
    
The common core components consist of a specification of the mathematical model in XML-file format and the simulation kernels. The XML file is arranged in a hierarchical manner and does not only include information on the different parts of the mathematical model, but also e.g. solver parameters. The simulation kernel currently contains the CVODE solver for (stiff) ordinary differential equations \[[18](../references.md#18)\], \[[6](../references.md#6)\]. A plug-in interface enables the straightforward integration of further ODE and DDE solvers. The XML model can be formulated with different software tools of the platform.

## Toolboxes‌

The MoBi® toolboxes for R and Matlab® are interfaces to the common statistical and technical computing environments, respectively. Basically, the toolboxes can be used to access and modify model parameters as well as to execute simulations and retrieve results. That way, the toolboxes can be used to script or code batch simulations, analysis tasks, or customized workflows to any complexity. Results can be visualized using the options available in the respective environment.

## Import and Export‌

Apart from the communication and exchange via Matlab®, PK-Sim® and MoBi® have import and export functions for MS Excel® that allow for the import of experimental data or the export of simulation results, for example. The SBML and SCAMP import functionalities for MoBi® are currently being updated to new versions and will soon be integrated.
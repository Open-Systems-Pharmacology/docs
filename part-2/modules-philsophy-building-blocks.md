# Modules, Philosophy and Building Blocks

## Introduction

The Open Systems Pharmacology Suite contains different software tools and has been designed using a modular concept to allow efficient multi-scale modeling and simulation. The overall platform with its various software tools is implemented in a modular way explained in the “Modular Structure” portion. The central software tools PK-Sim® and MoBi® make use of building blocks as introduced in [PK-Sim® and its building blocks](#pk-sim) and [MoBi® and its building blocks](#mobi).

PK-Sim® is based on a whole-body concept, the focus of its counterpart, MoBi®, is at the molecular level. However, both tools extend to additional physiological scales as illustrated below.

![Multiscale modeling and simulation (taken from [[18](../references.md#18)])](../assets/images/part-2/Eissing_et_al_Frontiers_2011_Figure1.jpg)

## PK-Sim®

PK-Sim® is a comprehensive software tool for whole-body physiologically based pharmacokinetic modeling \[[92](../references.md#92)\]. It enables rapid access to all relevant anatomical and physiological parameters for humans and common laboratory animals (mouse, rat, minipig, dog, and monkey) contained in the integrated database. Users are able to access to different PBPK calculation methods to allow for fast and efficient model building and parameterization. Relevant generic passive processes, such as distribution through blood flow as well as specific active processes such as metabolization by a certain enzyme are automatically taken into account by PK-Sim®. Like most PBPK modeling tools, PK-Sim® is designed for use by non-modeling experts and only allows for minor structural model modifications. Unlike most PBPK modeling tools though, PK-Sim® offers different model structures to choose from, e.g. to account for important differences between small and large molecules (see [Model settings](../part-3/pk-sim-simulations.md#model-settings)). More importantly, PK-Sim® is fully compatible with the expert modeling software tool MoBi®, thereby allowing full access to all model details including the option for extensive model modifications and extensions. This way customized systems pharmacology models may be set up to deal with the challenges of modern drug research and development.

PK-Sim® uses building blocks that are grouped into Individuals, Populations, Compounds, Formulations, Administration Protocols, Events, and Observed Data. The different building blocks are described in detail in “Working with PK-Sim®”. Building blocks from these groups are combined to produce a model. The advantage of building blocks is that they can be reused. For example, after having established a model for a drug after single dose intravenous administration to an animal species, just substitute the individual by a suitably parameterized virtual human population and obtain a first in man simulation model. Further substitute the formulation, to obtain a controlled-release per oral simulation model, substitute the protocol to a obtain a multiple dose simulation model, or substitute the compound to obtain a simulation model for another drug.

PK-Sim® will be described in detail in [Working with PK-Sim®](../part-3/pk-sim-quick-guide‌.md).

## MoBi®

MoBi® is a systems biology software tool for multiscale physiological modeling and simulation. Within the restrictions of ordinary differential equations, almost any kind of (biological) model can be imported or set up from scratch. Examples include biochemical reaction networks, compartmental disease progression models, or PBPK models. However, de novo development of a PBPK model, for example, is very cumbersome such that the preferred procedure is to import them from PK-Sim®. Importantly, MoBi® also allows for the combination of the described examples and thereby is a very powerful tool for modeling and simulation of multi-scale physiological systems covering molecular details  and whole-body architecture.

De novo model establishment and simulation is supported by graphical tools and building blocks to support expert users. MoBi® [uses building blocks that are grouped into Molecules, Reactions, Spatial Structures, Passive Transports, Observers, Events, Molecule Start Values, Parameter Start Values, and Observed Data. The different building blocks are described in detail in Part IV, “Working with MoBi®”. Building blocks out of the above-mentioned groups can be combined to generate models. The advantage of building blocks is that they can be reused. For example, a different set of starting values may define a new scenario, situation, or individual. Refine a Reaction(s) network and update it in all tissues where it should be considered.

MoBi® will be described in detail in [Working with MoBi®](../part-4/irst-steps.md).

## Modular Structure‌

The modular architecture of the software platform is outlined in screenshot below.

Apart from the two central, graphical user interface (GUI) based software tools PK-Sim® and MoBi®, the software platform has a common core, import and export options, as well as interfaces to general computing environments, as detailed below.

![Modular structure of the software platform](../assets/images/part-2/Eissing_et_al_Frontiers_2011_Figure2.jpg)

### Common XML and solver core‌

The common core components consist of a specification of the mathematical model in XML-file format and the simulation kernels. The XML file is arranged in a hierarchical manner and does not only include information on the different parts of the mathematical model, but also e.g. solver parameters. The simulation kernel currently contains the CVODE solver for (stiff) ordinary differential equations \[[18](../references.md#18)\], \[[6](../references.md#6)\]. A plug-in interface enables the straightforward integration of further ODE and DDE solvers. The XML model can be formulated with different software tools of the platform.

### Toolboxes‌

The MoBi® toolboxes for R is an interface to the common statistical computing environment. Basically, the R-toolbox can be used to access and modify model parameters as well as to execute simulations and retrieve results. That way, the R-toolbox can be used to script or code batch simulations, analysis tasks, or customized workflows to any complexity. Results can be visualized using the options available in the respective environment.

### Import and Export‌

Apart from the communication and exchange via R, PK-Sim® and MoBi® have import and export functions for MS Excel® that allow for the import of experimental data or the export of simulation results, for example.  MoBi® has been updated with SBML import functionalities. 

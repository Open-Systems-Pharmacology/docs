# MoBi®‌ The Building Block Concept

The building block concept in MoBi® offers large flexibility during model establishment and greatly supports extrapolation to e.g. different species or patient subgroups. The building block concept focuses on the actual physical interactions of the components in a system, i.e. once two molecules are defined as associated reaction partners, they may interact in any compartment of a system given their simultaneous availability. This availability, in turn, is dependent on the structural organization of a model, i.e. if two containers are linked by so-called neighborhood relation and if active or passive transport of the components is generally possible. The building block concept thus greatly supports the structural separation between properties of the compound which are defined by basic physico-chemistry of the molecule, and the physiology of the organism which is set by organism-specific parameters in the fundamental spatial structure of the model.

{% hint style="warning" %}
Defining a neighborhood between compartments is a prerequisite for exchange processes like active or passive transports.
{% endhint %}

The kinetic rate laws that describe the dynamics of the transport processes have to be defined independently in the building block **Passive Transport**. Logical containers in turn represent descriptive entities which support organization and visualization of the models. An important information on containers is also the hierarchy of its sub-models (parent vs. child) which ultimately defines path names and thus identifiers of the different containers, molecules and reactions.

{% hint style="warning" %}
Two different species like mice and humans are not necessarily different in their spatial structure. (By default, the spatial structures are even equal!) These two species differ in their parameter start values such as organ sizes, the blood flow rates, etc..
{% endhint %}

## Molecules‌

Generally, molecules can be any kind of countable entities. Mostly, molecules will be chemical or biological compounds and can either be quantified by amount or by concentration.

It is important to specify whether a molecule may move freely through all containers of a model, which is the default setting, or if it is stationary, i.e., it is immobilized in the current container. In the latter case, for example, the molecule may represent a membrane-bound receptor protein. Non-stationary molecules imported from PK-Sim® projects are automatically associated with their distribution calculation method (e.g., PK-Sim® standard, Rodgers and Rowland, etc.) which describes the basic ADME properties of a compound. Enzymes, metabolizing processes and transporters imported from PK-Sim® projects can be found in the Molecules building block as stationary molecules.

{% hint style="note" %}
Being substrate of a transporter, unlike being the substrate of an enzymatic reaction, is considered to be a drug property. Therefore, **active transports** are found under the drug properties in the Molecules building block.
{% endhint %}

## Reactions‌

Reactions define the causal interplay of the various molecules in a model. Note that, they are not associated with a particular location or container, but are rather physical rules for the interactions of the components of a system. If two molecules are defined as potential reaction partners, they will therefore react everywhere at any time throughout the model, as long as both molecules are simultaneously available in the same compartment. The inherent precondition for a reaction to be _created_ is that all reaction partners are present; the precondition to _really take place_ is that the amounts of the corresponding partners are not equal to zero.

{% hint style="note" %}
Reactions are defined independent of the location and take place wherever all reaction partners are present in non-zero amounts.
{% endhint %}

This concept has important implications for systems where more than one molecule is of interest and hence several molecules are simultaneously included in the overall model structure.

{% hint style="tip" %}
If both, drug A and drug B are known to bind the same binding partner, the mere structural consideration of both binding reactions leads to **competitive binding**, if the availability of the binding partner becomes limiting.
{% endhint %}

{% hint style="tip" %}
Drug-drug-interactions such as competitive inhibition of CYP3A4 can easily be described by defining a competitive inhibition in the reactions building block. Competitive inhibition takes place in compartments where drugs and CYP3A4 are simultaneously available.
{% endhint %}

## Passive Transports‌

The building block "passive transport" defines transport processes such as diffusion and convection. By MoBi®definition, passive transports are only **non-molecule mediated transports** between two containers connected via a neighborhood, which have to be defined by the spatial structure of the model. Target and source containers can be defined by setting tag identifiers as a mandatory condition.

{% hint style="tip" %}
It is possible to establish passive transports like between the plasma and interstitial compartments of all organs with one equation, if the neighborhoods between these compartments were defined in the spatial structure. The kinetics for this passive distribution have to be defined only once.
{% endhint %}

## Observers‌

Observers visualize specific simulation results, while not interfering with the mass balance of the molecules under consideration. Observers can be derived by formulas including molecules and parameters. Basically, there are **Molecule Observers**, which keep track of the amount or concentration of a single molecule, and **Container Observers**, which describe amount or concentration of molecule in different containers, for which a spatial neighborhood relation was defined. Container observers can also be used to summarize amounts of several molecules within containers.

{% hint style="warning" %}
MoBi® internally works with amounts rather than concentrations. Hence, all concentrations in a MoBi® project are defined as observers or parameters as amount divided by volume of the compartment.
{% endhint %}

## Events‌

Events describe conditional changes during a simulation, usually a time- dependent change of values or formulas, but also complex events like drug administration, nutritional uptake or physical exercise. MoBi®allows for any kind of change which can be described by means of an if condition.

{% hint style="tip" %}
An event is explicitly defined by a boolean formula including an "if" condition, which is will very often depend on time, specific parameters or the amount or concentration of a specific molecule.
{% endhint %}

An important distinction is whether an event only occurs once or repeatedly whenever the condition is true.

## Simulation Settings‌

The simulation settings can be managed separately from the actual simulations and can hence be used in different simulations in a project. When a new project is created, a default simulation settings building block is created. Simulation settings are divided into four distinct groups:

- Output Intervals: start and end time point of a simulation and resolution of a simulation; can be edited in this view in the **Output Intervals** tab.

- Solver Settings: solver parameters such as tolerance, use of Jacobian etc.; can also be edited in this view in the **Solver Settings** tab.

- Output Selection: outputs that will be available for plots; cannot be edited in this view but will be listed in the **Output Selection** tab after a successful simulation run in the **Simulation Creation Wizard**.

- Chart Templates: a set of chart templates can be managed in the **Chart Editor** as described in [Tools](tools.md); is part of the simulation settings, but not visible in this view.

## Molecule Start Values‌

This building block defines the start values of the molecules in the model. These are the initial amounts or concentration of all molecules and molecule- related parameters. The impact of an individual molecule (molecule in the sense of MoBi e.g. compound) can be assessed by setting the initial values of all other molecules to zero. This is an important concept in PBPK modeling that allows for successive consideration of different molecules and differentiation of their effects. In addition, specific values to enzyme concentrations derived from relative expression values that were extracted from the protein expression database in PK-Sim® can be assigned. If you want to exclude a specific molecule from a specific container, de-select the "is present" checkbox.

## Parameter Start Values‌

This building block defines the start values of the parameters in the model. This allows for the setting of specific physiological parameters if different individuals, species or patient subgroups are to be considered.

{% hint style="tip" %}
The size of the organs of a species, i.e., the containers, are defined in this building block. This means that scaling from one species to another or scaling from adults to children can be done by exchanging the parameter start values of the organs, blood flows etc..
{% endhint %}

## Observed Data‌

This building block includes the imported experimental (observed) data which can be e.g. [displayed in charts](simulation-results.md#observed-data) or [used for parameter identification](../part-5/parameter-identification.md). 

The import process is described in detail in [Shared Tools: Import and Edit of Observed Data](../part-5/import-edit-observed-data.md).



# MoBi®‌ The Building Block Concept

The **Building Block (BB)** concept in MoBi® offers large flexibility during model creation and reusability of model parts. The building block concept focuses on the actual physical interactions of the components in a system, i.e., once two molecules are defined as associated reaction partners, they may interact in any compartment of a system given their simultaneous availability. This availability, in turn, is dependent on the structural organization of a model, i.e., if two containers are linked by so-called neighborhood relation and if active or passive transport of the components is generally possible. The building block concept thus greatly supports the structural separation between properties of the compound which are defined by basic physico-chemistry of the molecule, and the physiology of the organism which is set by organism-specific parameters in the fundamental spatial structure of the model.

There are 8 different building blocks types that are organized in modules:
- **Spatial Structure**
- **Molecules**
- **Reactions**
- **Passive Transports**
- **Observers**
- **Events**
- **Initial Conditions**
- **Parameter Values**

Additionally, the building block types **Individuals** and **Expression Profiles** are organized separately and can be used in simulations with different modules.

The following sections give a brief overview of the different building blocks. More detailed information on each building block can be found in separate sections for each building block.

## Exporting and importing building blocks‌

All building blocks can be saved as a `*.pkml` file and imported into a new module from the file.

To **save** a building block as a `*.pkml` file:

1. In the Modules explorer, right-click the building block of interest, and select **Save As** from the context menu.
2. Select a location where it is saved in the file browser window that will open and select a name to save it.

To **import** a building block from a `*.pkml` file into a module that *does not have this BB type yet*, right-click on the module and select **Load Building Blocks**. An exception is the building block types **Parameter Values** and **Initial Conditions**, which can be imported into modules that already contain these BB types.

Also, you can use any saved building block to **load individual entities** from it, e.g., individual molecules, reactions, passive transports, or observers.

## Spatial Structure‌

The spatial structure building block defines the structural organization of the model. It contains the containers (e.g., organs, tissues, blood compartments) and their neighborhood relations. The spatial structure, therefore, defines the compartments of the model and their interconnections by defining the **neighborhoods** between the containers.

{% hint style="warning" %}
Two different species like mice and humans are not necessarily different in their spatial structure. (By default, the spatial structures are even equal!) These two species differ in their parameter values such as organ sizes, the blood flow rates, etc.
{% endhint %}

## Molecules‌

Generally, molecules can be any kind of countable entities. Mostly, molecules will be chemical or biological compounds and can either be quantified by amount or by concentration.
A molecule can either move between containers of a model (transported either by *passive* or by *active* transport processes), or be stationary, i.e., it cannot be transported between containers. In the latter case, for example, the molecule may represent a membrane-bound receptor protein

Non-stationary molecules imported from PK-Sim® projects are automatically associated with their distribution calculation method (e.g., PK-Sim® standard, Rodgers and Rowland, etc., see [Distribution](../part-3/pk-sim-compounds-definition-and-work-flow.md#distribution---distribution-calculation)). Selection of the distribution method defines how parameters describing the passive distribution of the compound and the partitioning into the different tissues are calculated.

All proteins, molecule-protein complexes, and metabolites (that are modeled as "sink", see [Definition of a metabolite in an enzymatic process‌](../part-3/pk-sim-compounds-definition-and-work-flow.md#definition-of-a-metabolite-in-an-enzymatic-process)) are also found in the Molecules building block as stationary molecules.

{% hint style="note" %}
Being a substrate of a transporter, unlike being the substrate of an enzymatic reaction, is considered to be a drug property. Therefore, **active transports** are found under the drug properties in the Molecules building block.
{% endhint %}

## Reactions‌

Reactions define the causal interplay of the various molecules in a model. Note that they are not associated with a particular location or container, but are rather physical rules for the interactions of the components of a system. If two molecules are defined as reaction partners, they will react everywhere in the model, as long as all reactants (and the catalyzing proteins, if required) are available in the same compartment. The inherent precondition for a reaction to be _created_ in the simulation structure is that all reaction partners are present; the precondition to _really take place_ is that the amounts of the corresponding partners are not equal to zero.

{% hint style="note" %}
Reactions are defined independent of the location and take place wherever all reaction partners are present in non-zero amounts.
{% endhint %}

This concept has important implications for systems where more than one molecule is of interest and hence several molecules are simultaneously included in the overall model structure.

{% hint style="tip" %}
If both, drug A and drug B, are known to bind the same binding partner, the mere structural consideration of both binding reactions leads to **competitive binding**, if the availability of the binding partner becomes limiting.
{% endhint %}

{% hint style="tip" %}
Drug-drug interactions, such as competitive inhibition of CYP3A4 can easily be described by defining a competitive inhibition in the reactions building block. Competitive inhibition takes place in compartments where drugs and the protein are simultaneously available.
{% endhint %}

## Passive Transports‌

The building block "Passive Transports" defines transport processes such as diffusion, convection, or transport along a lumen. Passive transports, in contrast to active transports, do not require a transporter protein to mediate the transport.

Passive (as well as active) transports are only possible between containers that are connected via a neighborhood relation in the spatial structure of the model. The rules for **target** and **source** containers of a transport are defined by the *container criteria* as a mandatory condition.

{% hint style="tip" %}
It is possible to establish passive transports like between the plasma and interstitial compartments of all organs with one equation, if the neighborhoods between these compartments were defined in the spatial structure. The kinetics for this passive distribution have to be defined only once.
{% endhint %}

## Observers‌

Observers visualize specific simulation results, while not interfering with the mass balance of the molecules under consideration. Observers can be derived by formulas including molecules and parameters. Basically, there are **Molecule Observers**, which keep track of the amount or concentration of a single molecule, and **Container Observers**, which describe amount or concentration of molecule in different containers, for which a spatial neighborhood relation was defined. Container observers can also be used to summarize amounts of several molecules within containers.

{% hint style="warning" %}
MoBi® internally works with amounts rather than concentrations. Hence, all concentrations in a MoBi® project are defined as observers or parameters as amount divided by volume of the compartment.
{% endhint %}

## Events‌

Events describe conditional changes during a simulation, usually a time-dependent change of values or formulas, but also complex events like drug administration, nutritional uptake, or physical exercise. MoBi®allows for any kind of change which can be described by means of an `if then else` condition.

{% hint style="tip" %}
An event is explicitly defined by a boolean formula including an `if` condition, which often depends on time, specific parameters, or the amount or concentration of a specific molecule.
{% endhint %}

An important distinction is whether an event only occurs once or repeatedly whenever the condition is true.

## Initial Conditions‌

This building block defines the start values (either as a constant value or a formula) of the molecules in the model. Additionally, Initial Conditions BB defines the containers in which the molecules will be present and whether their values may become negative.

## Parameter Values‌

The **Parameter Values (PV)** building block defines the values (constant or formula) of the parameters in the model. Values in the PV BB always overwrite the default values defined in other building blocks such as the spatial structure or the molecules building block. Therefore, the PV BB should only contain values for parameters that are different from the default values.

## Individuals‌

The **Individuals** building block defines the physiological properties of an individual. The parameter set referred to is limited to the parameters provided by PK-Sim®. New individuals can be created in MoBi® the same way as in PK-Sim®.

## Expression Profiles‌

The **Expression Profiles** building block defines the expression of a protein. Technically, the Expression Profiles BB is comparable to the Parameter Values BB, containing all parameters that define the expression of a protein, and an Initial Condition for the amount and the location of the protein. New Expression Profiles can be created and the information queried from the database in MoBi® the same way as in PK-Sim®.

## Observed Data‌

This building block includes the imported experimental (observed) data which can be, e.g., [displayed in charts](simulation-results.md#observed-data) or [used for parameter identification](../part-5/parameter-identification.md). 

The import process is described in detail in [Shared Tools: Import and Edit of Observed Data](../part-5/import-edit-observed-data.md).
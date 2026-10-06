# Overwrite Parameter Sets

## Motivation

Not every compound-dependent parameter of a simulation is stored in the **Compound** building block. Many of them — for example organ-plasma partition coefficients, cellular permeabilities or the permeabilities of the endothelial barriers — are *calculated* during simulation creation from the physico-chemical properties of the compound and from the properties of the individual. Such parameters only exist inside the simulation, and PK-Sim® treats them as **simulation parameters**.

Manual overrides of such parameters — for example a partition coefficient obtained from an in vitro experiment, or a permeability obtained by parameter identification — can be stored in **Overwrite Parameter Sets**. An "Overwrite Parameter Set" is a *named collection of parameter values* that is stored inside the Compound building block. You create it by **committing** the changed simulation parameters of a compound back to that compound, and you re-use it by **selecting** it when a simulation is created or configured. One Overwrite Parameter Set can be selected per compound and simulation, and selecting one is optional.

{% hint style="info" %}
Overwrite Parameter Sets complement, but do not replace, the existing synchronization between a simulation and its building blocks (see [Synchronization options for building blocks in a simulation](pk-sim-simulations.md#synchronization-options-for-building-blocks-in-a-simulation)). **Commit to Building Block** writes back the values of parameters that *exist* in the compound; an Overwrite Parameter Set stores the values of compound-dependent parameters that *do not exist* in the compound.
{% endhint %}

## Which parameters can be committed

A simulation parameter is offered for a commit when both of the following are true:

- It is a **simulation parameter**, i.e. its value is not taken from a Compound building block but is calculated during simulation creation (usually, these are the parameters that depend on the compounds *and* individual properties).
- One element of its path exactly matches the name of the compound.

Compounds that are created inside the simulation but are not represented by a separate Compound building block — for example an unnamed metabolite of a parent/metabolite simulation — are not considered.

Parameters that were applied from an Overwrite Parameter Set are also offered for a commit if you change them again, so a set can be refined step by step.

## Uncommitted changes

As soon as you change the value of such a parameter in a simulation, PK-Sim® marks the change as **uncommitted**. This is shown by an orange indicator:

- On the **simulation** in the **Simulation Explorer**, an orange overlay is added to the simulation icon as long as the simulation contains any uncommitted compound-dependent change.
- On the **compound inside the simulation**, the orange status indicator is added next to the green or red synchronization state. The combination of a green and an orange indicator means that the compound is in sync with its building block properties, but has uncommitted compound-dependent parameter changes; the combination of a red and an orange indicator means that it is out of sync (e.g., parameters that are defined in the compound building block, such as Lipophilicity, or any of the ADME processes, differ) *and* has uncommitted changes.

![The Simulation Explorer of a simulation with two compounds. The simulation icon carries an orange overlay. Midazolam has only uncommitted compound-dependent changes, Keto-Itraconazole is in addition out of sync with its building block.](../assets/images/part-3/overwrite-parameter-sets-uncommitted-indicator.png)

{% hint style="warning" %}
Resetting a parameter that was applied from an Overwrite Parameter Set returns it to the value originally calculated for the simulation. Committing to the selected set removes the parameter from the set.
{% endhint %}

## Committing simulation parameters to a compound

1. In the **Simulation Explorer**, expand the simulation and right-click on the compound whose parameters you want to store.
2. Select **Commit Simulation Parameters to Compound...**

![The context menu of a compound used in a simulation, with the Commit Simulation Parameters to Compound action.](../assets/images/part-3/overwrite-parameter-sets-context-menu.png)

{% hint style="info" %}
The action is only offered for a compound of an **individual simulation** that actually has uncommitted changes. Overwrite Parameter Sets can be *used* in population simulations, but they cannot be created from one — see [Population simulations](#population-simulations) below.
{% endhint %}

The **Commit simulation parameters to compound** dialog opens. It contains:

- A table of all uncommitted parameters of this compound, with the columns **Selected**, **Parameter** (the path of the parameter in the simulation), **Change** (update value, or remove from the list), **Value** (with its display unit), and **Value Origin**. Every parameter is selected by default; clear the check box of the ones you do not want to store.
- A **Commit Options** group:
  - **Create New Parameter Set** — enter a **Name** for the new set. By default it is filled in with the name of the compound. The name must not be empty and must not be used by another Overwrite Parameter Set of the same compound.
  - **Update Parameter Set** — update the currently selected Overwrite Parameter Set.

![The Commit simulation parameters to compound dialog. The table lists the parameter changes, and the currently selected Overwrite Parameter Set is being updated.](../assets/images/part-3/overwrite-parameter-sets-commit-dialog.png)

Confirm with **OK**. The set is created in — or updated on — the Compound building block of the project, and the committed parameters are no longer marked as uncommitted.

When a new parameter set is created during the commit, this set is automatically selected in the simulation configuration for this compound.

### What happens when an existing set is updated

- Parameters you are committing are added to the set, or their stored value is overwritten.
- Parameters that were in the set and that you have **reset** in the simulation since the last commit are **removed** from the set.
- Parameters that were in the set and that you have not touched are **preserved**.

If you do not select all changed parameters to the commit, the simulation will still show the orange indicator, since the parametrization in the simulation still differs from the values in the Building Block and the Overwrite Parameter Set.

## The Overwrite Parameter Sets tab of a compound

The Overwrite Parameter Sets of a compound are shown in the same-named tab of the compound editor.

- The **list on the left** shows all Overwrite Parameter Sets of the compound with the columns **Name**, **Default**, **Species** and **Disease State**.
- The **details on the right** show the **Metadata** of the selected set above a table of its parameter values, with the columns **Path**, **Value** and **Value Origin**.

![The Overwrite Parameter Sets tab of a compound. Two sets are defined, the first one is the default and carries Species and Disease State metadata. The tooltip shows the full path of the selected entry.](../assets/images/part-3/overwrite-parameter-sets-compound-tab.png)

{% hint style="info" %}
New Overwrite Parameter Sets can only be created by committing from a simulation, never from this tab. The tab is for reviewing, documenting and correcting existing sets.
{% endhint %}

### Editing a set

In the parameter table you can:

- Change the **Value** of a stored parameter.
- Change the unit of the value, in the unit selector of the value editor. As for any other parameter in the suite, the displayed number is kept and the value in base unit is recalculated (see [Default, Display and Base Units](../part-5/default-display-base-units.md)).
- Set the **Value Origin** of the entry, to document where the value comes from.
- Delete a single parameter from the set.

Additionally you can:

- Delete an entire Overwrite Parameter Set.
- Mark a set as the **Default** of the compound, or clear that flag. A compound is not required to have a default set. The default set is the one preselected when the compound is used in a new simulation; if the compound has no default set, no set is preselected (see [Using an Overwrite Parameter Set in a simulation](#using-an-overwrite-parameter-set-in-a-simulation)).

{% hint style="warning" %}
An Overwrite Parameter Set that is used in any simulation of the project cannot be deleted. The error message lists the simulations that block the deletion.
{% endhint %}

When you edit an existing Overwrite Parameter Set (e.g., change its values, metadata, or remove entries), or remove a set, all simulations that use this compound get the "Red exclamation mark", even if the Overwrite Parameter Set is not used in the simulation. The reason is that the compound building block information has changed, even if it is not used in the simulation.

### Metadata

Each Overwrite Parameter Set can carry optional metadata that documents its intended use — **Species** and **Disease State**. The metadata is purely informational: it is displayed in the tab and stored with the compound, but it is not used to filter or validate the sets offered in a simulation.

## Using an Overwrite Parameter Set in a simulation

The Overwrite Parameter Set to be used is chosen per compound in the **Compounds** tab of the **Create Simulation** window — both when a new simulation is created and when an existing simulation is configured (see [Review compound settings](pk-sim-simulations.md#review-compound-settings)).

The **Overwrite parameter set in compound** drop-down list offers **\<None\>** plus all Overwrite Parameter Sets defined for that compound:

- If the compound has a **default** set, it is preselected.
- If it has none, **\<None\>** is preselected.
- **\<None\>** means that the compound-dependent simulation parameters keep their originally calculated values.

![The Compounds tab of the Configure Simulation window. For the compound Midazolam, the Overwrite Parameter Set group offers the sets defined for that compound.](../assets/images/part-3/overwrite-parameter-sets-selection.png)

The selected set is applied at the end of the simulation creation, after the model has been built. For each entry of the set, the parameter with the stored path is looked up in the new simulation and its value is replaced.

An entry is stored with the full path of the parameter in the simulation, which starts with the name of the compound or contains it as one of its elements:

```text
Midazolam|Intestinal permeability (paracellular)
```

The set can therefore only be applied to a simulation in which exactly these paths exist.

{% hint style="warning" %}
If a path stored in the selected Overwrite Parameter Set cannot be resolved in the new simulation, PK-Sim® reports an error listing the unresolved paths and the **simulation is not created**. This happens when the simulation does not contain a parameter stored in the set, for example because a process the parameter belongs to is not part of the simulation, or because the simulation uses a different distribution model or different *Calculation methods* than the simulation the set was committed from.
{% endhint %}

## Population simulations

An Overwrite Parameter Set can be selected for a compound of a population simulation, and its values are applied in the same way. In addition:

- Each overwritten parameter is flagged as **not variable in the population**, so that the value taken from the set is kept for every individual.
- If an advanced (varied) parameter had already been defined for one of these paths, it is removed from the population simulation, so that it cannot override the value at run time.

Committing simulation parameters is not available from a population simulation. Create the set from an individual simulation and select it in the population simulation.

## Updating and committing the compound

A compound used in a simulation is a copy of the Compound building block of the project, and it carries its own Overwrite Parameter Sets.

To get new Overwrite Parameter Sets into a simulation for selection (e.g., when a new set was created in another simulation using the same compound), you need to update the Compound from its building block.

Committing compound changes from the simulation (e.g., changed lipophilicity) never touches the Overwrite Parameter Sets in the compound building block; they are only changed with the "Commit Simulation Parameters to Compound..." action.

## Overwrite Parameter Sets and the rest of the project

- **Compound renaming.** Renaming a compound also renames the compound in all paths stored in its Overwrite Parameter Sets, so existing sets stay applicable.
- **Templates and snapshots.** Overwrite Parameter Sets are part of the compound. They are stored in the project, saved with the compound as a template, and written to and read from snapshots, and are therefore available when the compound is re-used in another project.
- **Comparison.** Overwrite Parameter Sets are part of the comparison of two compounds (see [Comparison of Building Blocks](../part-5/comparison-building-blocks.md)).
- **MoBi®.** When a simulation is exported to MoBi®, the values of the selected Overwrite Parameter Sets are merged into the `ParameterValues` building block created for the simulation. MoBi® therefore receives the overwritten values without needing to know the concept, and no additional step is required.

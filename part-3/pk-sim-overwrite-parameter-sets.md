# Overwrite Parameter Sets

## Motivation

Not every compound-dependent parameter of a simulation is stored in the **Compound** building block. Many of them — for example organ-plasma partition coefficients, cellular permeabilities or the permeabilities of the endothelial barriers — are *calculated* during simulation creation from the physico-chemical properties of the compound and from the properties of the individual. Such parameters only exist inside the simulation, and PK-Sim® treats them as **simulation parameters**.

If you replace such a calculated value by a constant value of your own — for example a partition coefficient obtained from an in vitro experiment, or a permeability obtained by parameter identification — the new value lives in that one simulation only. It is not part of the compound, so it is not applied when the same compound is used in another simulation, it is not carried over when the compound is saved as a template, and it has to be re-entered manually every time.

An **Overwrite Parameter Set** solves this. It is a *named collection of parameter values* that is stored inside the Compound building block. You create it by **committing** the changed simulation parameters of a compound back to that compound, and you re-use it by **selecting** it when a simulation is created or configured. One Overwrite Parameter Set can be selected per compound and simulation, and selecting one is optional.

{% hint style="info" %}
Overwrite Parameter Sets complement, but do not replace, the existing synchronization between a simulation and its building blocks (see [Synchronization options for building blocks in a simulation](pk-sim-simulations.md#synchronization-options-for-building-blocks-in-a-simulation)). **Commit to Building Block** writes back the values of parameters that *exist* in the compound; an Overwrite Parameter Set stores the values of compound-dependent parameters that *do not exist* in the compound.
{% endhint %}

## Which parameters can be committed

A simulation parameter is offered for a commit when both of the following are true:

- It is a **simulation parameter**, i.e. its value is not taken from a building block but is calculated during simulation creation.
- Its path contains the name of a compound that is used as a building block in the simulation configuration.

Compounds that are created inside the simulation but are not part of the simulation configuration — for example an unnamed metabolite of a parent/metabolite simulation — are therefore not considered.

Parameters that were applied from an Overwrite Parameter Set are also offered for a commit if you change them again, so a set can be refined step by step.

## Uncommitted changes

As soon as you change such a parameter, PK-Sim® marks the change as **uncommitted**. This is shown by an orange indicator:

- On the **simulation** in the **Simulation Explorer**, an orange overlay is added to the simulation icon as long as the simulation contains any uncommitted compound-dependent change.
- On the **compound inside the simulation**, a second, orange status indicator is added next to the green or red synchronization state, which itself does not change. The combination of a green and an orange indicator means that the compound is in sync with its building block but has uncommitted compound-dependent parameter changes; the combination of a red and an orange indicator means that it is out of sync *and* has uncommitted changes.

![The Simulation Explorer of a simulation with two compounds. The simulation icon carries an orange overlay. Midazolam has only uncommitted compound-dependent changes, Keto-Itraconazole is in addition out of sync with its building block.](../assets/images/part-3/overwrite-parameter-sets-uncommitted-indicator.png)

Resetting a parameter that is not supplied by the selected Overwrite Parameter Set returns it to its original value and removes it from the uncommitted changes again. Undo/redo restores the previous state of the indicator. The list of uncommitted changes is saved with the project and kept when the simulation is configured, so the indicator is still there when the project is reopened.

{% hint style="info" %}
Resetting a parameter that was applied from the Overwrite Parameter Set selected for the simulation returns it to the value originally calculated for the simulation, not to the value stored in the set. The reset is marked as an uncommitted change, because the simulation now uses a value that the selected set does not contain. Committing it to the selected set removes the parameter from the set. Configuring the simulation instead applies the set again, restores the stored value and discards the reset.
{% endhint %}

## Committing simulation parameters to a compound

1. In the **Simulation Explorer**, expand the simulation and right mouse click on the compound whose parameters you want to store.
2. Select **Commit Simulation Parameters to Compound...**

![The context menu of a compound used in a simulation, with the Commit Simulation Parameters to Compound action.](../assets/images/part-3/overwrite-parameter-sets-context-menu.png)

{% hint style="info" %}
The action is only offered for a compound of an **individual simulation** that actually has uncommitted changes. Overwrite Parameter Sets can be *used* in population simulations, but they cannot be created from one — see [Population simulations](#population-simulations) below.
{% endhint %}

The **Commit simulation parameters to compound** dialog opens. It contains:

- A table of the parameters the commit writes, with the columns **Selected**, **Parameter** (the path of the parameter in the simulation), **Change**, **Value** (with its display unit) and **Value Origin**. The **Change** column tells what the commit does with each row:
  - **Update value** — the parameter was changed in the simulation, and its current value is written to the set.
  - **Remove from set** — the parameter belongs to the set selected for the simulation and was reset, so it is removed from that set. The **Value** column shows the recalculated value the simulation now uses. These rows are listed only when the selected set is updated.
  - **Unchanged** — an entry of the set selected for the simulation that you did not touch. It is copied into the new set with the value the simulation currently uses. These rows are listed only when a new set is created.

  Every row is selected by default. Clear the check box of the rows you do not want to commit; they stay uncommitted.
- A **Commit Options** group with two mutually exclusive choices:
  - **Create New Parameter Set** — enter a **Name** for the new set. By default it is filled in with the name of the compound. The name must not be empty and must not be used by another Overwrite Parameter Set of the same compound. This option is disabled when the only rows are removals, because reset parameters alone cannot make up a set.
  - **Update Parameter Set '…'** — updates the set selected for the compound in the simulation, whose name is shown in the option. It is preselected when a set is selected, and disabled when the simulation uses no set.

To store simulation parameters in another existing set, select that set for the compound when configuring the simulation, then commit.

![The Commit simulation parameters to compound dialog. The selected set is being updated: the table lists a changed parameter and a reset parameter that is removed from the set.](../assets/images/part-3/overwrite-parameter-sets-commit-dialog.png)

Confirm with **OK**, which is enabled as soon as at least one row is selected. The whole commit is a single action and can be undone.

The set is written to the Compound building block of the project and to the compound used in the simulation, so both hold the same sets afterwards. The synchronization state of the compound in the simulation does not change: a compound that was in sync stays in sync, and one that was out of sync for another reason stays out of sync. Other simulations that use the same compound are shown as out of sync, and **Update from Building Block** brings the new or updated set into them.

Committing to a new set selects it for the compound in the simulation. The simulation is not rebuilt, because the new set holds the values the simulation currently uses and applying it would change nothing. Updating the selected set keeps the selection.

After the commit, the orange indicator shows what the selected set does not hold:

- Committed rows are no longer marked as uncommitted.
- Rows whose check box you cleared stay uncommitted.
- When a new set is created, parameters that you reset are left out of it and are no longer marked, since the simulation already uses their calculated value. An **Unchanged** row whose check box you cleared is left out of the new set as well and becomes an uncommitted change, since the simulation still uses the value the previous set supplied.

{% hint style="warning" %}
A parameter that the previously selected set supplied and that you leave out of a new set is not stored anywhere the simulation uses. It stays marked as uncommitted, but configuring the simulation with the new set returns it to its calculated value. Commit it before configuring the simulation to keep its value.
{% endhint %}

### What happens when the selected set is updated

Updating the selected set is not a full replacement. PK-Sim® keeps the set consistent with the current state of the simulation:

- Parameters you are committing are added to the set, or their stored value is overwritten.
- Parameters listed as **Remove from set** are removed from the set when their row is selected.
- Parameters that were in the set and that you have not touched are **preserved**.

After a commit that includes every row, re-creating the simulation with the selected set therefore reproduces exactly the parameter values the simulation has at the moment of the commit. This holds for a new set as well, since it contains the committed parameters and the untouched entries of the previously selected set.

## The Overwrite Parameter Sets tab of a compound

The Overwrite Parameter Sets of a compound are shown in the same-named tab of the compound editor, after the **Advanced Parameters** tab. The tab uses a master-detail layout:

- The **list on the left** shows all Overwrite Parameter Sets of the compound with the columns **Name**, **Default**, **Species** and **Disease State**, followed by a button that deletes the set.
- The **details on the right** show the **Metadata** of the selected set above a table of its parameter values, with the columns **Path**, **Value** and **Value Origin**, followed by a button that deletes the entry. The value is displayed together with its unit.

![The Overwrite Parameter Sets tab of a compound. Two sets are defined, the first one is the default and carries Species and Disease State metadata. The tooltip shows the full path of the selected entry.](../assets/images/part-3/overwrite-parameter-sets-compound-tab.png)

{% hint style="info" %}
New Overwrite Parameter Sets can only be created by committing from a simulation, never from this tab. The tab is for reviewing, documenting and correcting existing sets.
{% endhint %}

### Editing a set

In the parameter table you can:

- Change the **Value** of a stored parameter.
- Change the unit of the value, in the unit selector of the value editor. As for any other parameter in the suite, the displayed number is kept and the value in base unit is recalculated (see [Default, Display and Base Units](../part-5/default-display-base-units.md)).
- Set the **Value Origin** of the entry, to document where the value comes from.
- Delete a single parameter from the set, with the button at the end of its row.

Additionally you can:

- Delete an entire Overwrite Parameter Set, with the button at the end of its row in the list on the left, after confirming the deletion.
- Mark a set as the **Default** of the compound, or clear that flag. A compound can have at most one default set, and setting a new default clears the previous one. A compound is not required to have a default set. The default set is the one preselected when the compound is used in a new simulation; if the compound has no default set, no set is preselected (see [Using an Overwrite Parameter Set in a simulation](#using-an-overwrite-parameter-set-in-a-simulation)).

All of these changes can be undone.

{% hint style="warning" %}
An Overwrite Parameter Set that is used in any simulation of the project cannot be deleted. The error message lists the simulations that block the deletion.
{% endhint %}

### Metadata

Each Overwrite Parameter Set can carry optional metadata that documents its intended use — by default **Species** and **Disease State**, chosen from the species and disease states known to PK-Sim®. The metadata is purely informational: it is displayed in the tab and stored with the compound, but it is not used to filter or validate the sets offered in a simulation.

## Using an Overwrite Parameter Set in a simulation

The Overwrite Parameter Set to be used is chosen per compound in the **Compounds** tab of the **Create Simulation** window — both when a new simulation is created and when an existing simulation is configured (see [Review compound settings](pk-sim-simulations.md#review-compound-settings)).

The **Overwrite parameter set in compound** drop-down list offers **\<None\>** plus all Overwrite Parameter Sets defined for that compound:

- If the compound has a **default** set, it is preselected.
- If it has none, **\<None\>** is preselected.
- **\<None\>** means that the compound-dependent simulation parameters keep their originally calculated values.

The sets offered are those of the compound that is selected in the **Model Structure** step of the window — the compound of the project, or the copy currently used by the simulation. A commit writes the set to both, so a newly committed set can be selected right away.

![The Compounds tab of the Configure Simulation window. For the compound Midazolam, the Overwrite Parameter Set group offers the sets defined for that compound.](../assets/images/part-3/overwrite-parameter-sets-selection.png)

The selected set is applied at the end of the simulation creation, after the model has been built. For each entry of the set, the parameter with the stored path is looked up in the new simulation and its value is replaced.

An entry is stored with the full path of the parameter in the simulation, which starts with the name of the compound or contains it as one of its elements:

```text
Midazolam|Intestinal permeability (paracellular)
```

The set can therefore only be applied to a simulation in which exactly these paths exist.

Parameters that were overwritten this way behave as **compound parameters** from then on:

- They are shown as compound parameters. Resetting one returns it to its originally calculated value and marks the reset as an uncommitted change, a pending removal from the set (see [Uncommitted changes](#uncommitted-changes)).
- Their value origin is taken from the entry of the set.
- They have no counterpart in the Compound building block itself, so they can only be written back through a commit to an Overwrite Parameter Set, not through **Commit to Building Block**.
- Their value depends on the selection from then on: configuring the simulation with **\<None\>** returns them to their originally calculated value. Parameters that were never supplied by a set keep the value you gave them across a configuration.

{% hint style="warning" %}
If a path stored in the selected Overwrite Parameter Set cannot be resolved in the new simulation, PK-Sim® reports an error listing the unresolved paths and the **simulation is not created**. No value of the set is applied in this case. This happens when the simulation does not contain a parameter stored in the set, for example because a process the parameter belongs to is not part of the simulation, or because the simulation uses a different distribution model or different *Calculation methods* than the simulation the set was committed from.
{% endhint %}

## Population simulations

An Overwrite Parameter Set can be selected for a compound of a population simulation, and its values are applied in the same way. In addition:

- Each overwritten parameter is flagged as **not variable in the population**, so that the value taken from the set is kept for every individual.
- If an advanced (varied) parameter had already been defined for one of these paths, it is removed from the population simulation, so that it cannot override the value at run time.

Committing simulation parameters is not available from a population simulation. Create the set from an individual simulation and select it in the population simulation.

## Updating and committing the compound

A compound used in a simulation is a copy of the Compound building block of the project, and it carries its own Overwrite Parameter Sets. Two rules describe how the two are kept together:

1. **The sets of the compound in the simulation are a copy of those in the building block.** **Update from Building Block**, **Commit to Building Block** and committing simulation parameters all make the compound of the simulation an exact copy of the Overwrite Parameter Sets of the Compound building block: missing sets are added, differing ones updated, and sets that no longer exist in the building block removed. Sets are never copied in the opposite direction — a set reaches the building block only by committing simulation parameters to it.
2. **Neither operation changes a parameter value that came from a set.** The values of an Overwrite Parameter Set are applied only when the simulation is created or configured.

The individual situations follow from these two rules:

| Situation | Set in the building block | Set in the compound of the simulation | Parameter value in the simulation |
| --- | --- | --- | --- |
| **Commit to Building Block** after the value was changed in the set in the compound | keeps the changed value; it is not overwritten from the simulation | copy of the building block, so the changed value | unchanged |
| **Update from Building Block** in another simulation after simulation parameters were committed | contains the new or updated set | copy of the building block, so the set becomes selectable | unchanged; the values of the set are applied when the simulation is next configured with it |
| **Update from Building Block** after the value was changed in the set in the compound | changed value | copy of the building block, so the changed value | unchanged; the new value is applied when the simulation is next configured |
| **Update from Building Block** after an Overwrite Parameter Set parameter was changed in the simulation | unchanged | unchanged | the change is kept and stays an uncommitted change |

## Overwrite Parameter Sets and the rest of the project

- **Compound renaming.** Renaming a compound also renames the compound in all paths stored in its Overwrite Parameter Sets, so existing sets stay applicable.
- **Templates and snapshots.** Overwrite Parameter Sets are part of the compound. They are stored in the project, saved with the compound as a template, and written to and read from snapshots, and are therefore available when the compound is re-used in another project.
- **Comparison.** Overwrite Parameter Sets are part of the comparison of two compounds (see [Comparison of Building Blocks](../part-5/comparison-building-blocks.md)).
- **MoBi®.** When a simulation is exported to MoBi®, the values of the selected Overwrite Parameter Sets are merged into the `ParameterValues` building block created for the simulation. MoBi® therefore receives the overwritten values without needing to know the concept, and no additional step is required.

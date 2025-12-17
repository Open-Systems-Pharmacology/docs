# Parameter Values

The Parameter Values (PV) Building Block (BB) defines the values of various parameters present in the simulation structure. By default, a PV BB should only contain values that are different from the default values defined in the building blocks where the parameter is defined.

Additionally, PV BB can **create** new parameters during simulation creation.

The following section describes the functionalities of the PV BB. Later on, a simple [example](parameter-values-bb.md#creating-parameter-values-building-blocks) is given to create a new PV BB and populate it with information.

## Parameter Values - Functionality Overview

In contrast to other BB types except for the initial conditions BB, **multiple** PV BBs can be created within one module. This allows you to define different parameterization sets for different simulation scenarios. For example, different parameter sets may represent different disease states or different species. During simulation creation, you can select which PV BB to use.

The context menu of a PV BB offers the following commands:

* **Save As PKML**: Save the PV BB as a pkml file.
* **Clone**: Create a copy of the selected PV BB in the same module.
* **Import from Excel**: Import PV BB information from an Excel file. The excel file must have the following columns:
  * **Container Path**: The path of the container in which the parameter is located. Path levels are separated by `|`. For example, `Organism|Liver`.
  * **Parameter Name**: The name of the parameter. For example, `Volume`.
  * **Value**: The value of the parameter.
  * **Units**: The unit of the value.

{% hint style="info" %}
Values defined by a formula cannot be imported from Excel.
{% endhint %}

* **Export to Excel**: Export the PV BB information to an Excel file. The exported file has the same format as described for the import.

{% hint style="warning" %}
Only entries for parameters that are defined by a constant value (not by a formula) can be exported to Excel!
{% endhint %}

* **Extend from Parameter Values Building Block**: Adds entries from the Parameter Values BB previously exported to pkml. New values are always _added_, existing values are _overwritten_.
* **Extend from Expression Profile Building Block**: Adds entries from **Parameters** tab of an Expression Profile BB previously exported to pkml. New values are always _added_, existing values are _overwritten_. Useful when creating a custom expression profile as initial condition.
* **Extend from Individual Building Block**: Adds entries from the Individual BB previously exported to pkml. New values are always _added_, existing values are _overwritten_. Useful when trying to overwrite individual-specific parameters.

The editor of the PV BB has the following buttons (multi-select of the rows is possible):

* **Delete**: Removes the selected entries

The table view shows the following:

* **Parameter Name**: The name of the molecule.
* **Path Element N**: Represents the N-th level in the hierarchical container path within the spatial structure where the parameter is located.
* **Parameter Value**: The initial amount or concentration of the molecule in the container.
* **Formula**: The formula used to calculate the parameter value. If a formula is assigned, the value is `<Not Available>`.
* **Dimension**: The dimension of the parameter.

{% hint style="info" %}
For _state variable_ parameters, the **Value** is the initial value of the parameter.
{% endhint %}

## Creating new parameters in simulation structure through PV BB

A PV BB can be used to create new parameters that do not exist in the model yet. This can be useful to define parameters that are only relevant for a specific simulation scenario.

If parameter `Param A` in the container `Organism|Organ A|Container A1` does not exist in the model yet, but is defined in a PV BB that is selected during simulation creation, the parameter will be created in the specified container with the specified value.

The parameter will only be created if the parent path (i.e., `Organism|Organ A|Container A1`) exists in the model. If the parent path does not exist, the parameter will not be created and a warning will be shown during simulation creation.

## Creating Parameter Values Building Blocks

To create a new PV BB in a module, right-click on the module and select **Add Building Blocks** from the context menu. In the dialog that opens, select **Parameter Values** and enter a unique name for the new BB. Click **OK** to create the new PV BB.

The new PV BB does not contain any information yet. To populate it with information, you can either import the information from an Excel or a pkml file, or create new entries.

### Adding new entries

To manually add new entries to an IC BB:

1. Click on **New Parameter Value** button in the **Edit** group of the **Edit Parameter Values** ribbon tab.
2. A window appears that allows you to select parameters from a path tree on the left side. The parameters are grouped as follows:
   * **Spatial Structures**: List of spatial structures in all modules of the project. Expand a spatial structure to see its containers (including the neighborhoods). Within the containers, you will find the parameters defined for the container and for the molecules present in the container.
   * **Individuals**: List of individuals in all modules of the project. Expand an individual to see its parameters.
   * **Expression profiles**: List of expression profiles in all modules of the project. Expand an expression profile to see its parameters.
   * **Events**: List of events building blocks in all modules of the project.

Parameters of the reactions and transport processes are not available for selection at this point.

Select the desired parameter and click **Add**. You can multi-select parameters.

3.  Alternatively, you can type in the full path of the parameter in the **Parameter Paths to Add** box on the right. Multiple paths can be added, separated by a new line. For example:

    ```
    Organism|Liver|Volume
    Organism|Kidney|Volume
    ```
4. Click **OK** to add the selected parameters to the PV BB. The edit window of the PV BB will show the newly added parameters.

{% hint style="info" %}
The path is composed of different levels of the spatial structure. If the current view of the PV BB does not show enough columns to enter all levels (e.g., after creating a new PV BB, no path levels are shown), you can right click on any column header and select **Column Chooser** from the context menu. In the dialog that opens, you can select which levels of the spatial structure you want to be shown as columns in the table view.
{% endhint %}

### Add Protein Expression

Protein expressions are defined as a set of parameter values and initial conditions. There are several cases where you might want to add protein expression information to a PV BB:

* You have created a custom spatial structure and want to add protein expression information to it.
* You want to overwrite the protein expression information in a custom PV BB to reflect a specific disease state.
* etc.

A convenient way to add all required parameters to describe protein expression in a spatial structure is to use the **Add Protein Expression** functionality. To do so:

1. Click on the **Add Protein Expression** button in the **Edit** group of the **Edit Parameter Values** ribbon tab.
2. A window opens that allows you to select organs within spatial structures and the proteins you want to add.

The expression parameters will be added to the selected organs, whereby the correct formulas will be automatically assigned. If the selected organ is present in the default protein expression BB, the values for this organ will be used. Otherwise, the default values defined in the molecule BBs will be used (usually, relative expression will be set to 0).

{% hint style="warning" %}
When adding protein expression for a new organ, do not forget to also add the corresponding molecule start values to the IC BB!
{% endhint %}

{% hint style="info" %}
Only new entries are added. Existing entries are not modified.
{% endhint %}

### Add Local Molecule Parameters

Molecules can have local parameters that are defined for each physical container in which the molecule is present. Examples for such parameters are the **Degradation coefficient** but also expression parameters of a protein. To conveniently add such parameters for all physical containers of a spatial structure, you can use the **Add Local Molecule Parameters** functionality. To do so:

1. Click on the **Add Local Molecule Parameters** button in the **Edit** group of the **Edit Parameter Values** ribbon tab.
2. A window opens that allows you to select a spatial structure and one or more molecules.

This will add entries for all local molecule parameters (defined by a constant) for selected molecules in all physical containers of the selected spatial structure. When new entries are added, the parameter values or formulas are set to their default values as defined in the selected molecules building block, and these values are used for all containers in the selected spatial structure.

Only _constant_ local parameters are added. If a parameter is defined by a formula, it is assumed that it should not be overwritten by a PV BB. However, the parameter can still be added manually.

{% hint style="info" %}
Only new entries are added. Existing entries are not modified.
{% endhint %}

{% hint style="info" %}
Parameters defining the expression of proteins are also local molecule parameters. However, it is recommended to use the **Add Protein Expression** functionality to add such parameters, as it will automatically assign the correct formulas and values.
{% endhint %}

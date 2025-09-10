# Initial Conditions Building Blocks

The Initial Conditions (IC) Building Block (BB) defines the containers in which the molecules will be present and their initial amounts.

The following section describes the functionalities of the IC BB on a PBPK model exported from PK-Sim. Later on, a simple [example](#example---creating-ic-bb) is given to create a new IC BB and populate it with information.

## Initial Conditions - Functionality‌ Overview

An IC BB can contain entries for molecules in physical containers across different modules.

In contrast to other BB types except for the parameter values BB, **multiple** IC BBs can be created within one module. This allows you to define different initial conditions for different simulation scenarios. For example, different initial concentrations of an endogenous molecule may represent different disease states. During simulation creation, you can select which IC BB to use.

The context menu of an IC BB offers the following commands:

- **Save As PKML**: Save the IC BB as a pkml file.
- **Clone**: Create a copy of the selected IC BB in the same module.
- **Import from Excel**: Import IC BB information from an Excel file. The excel file must have the following columns:
    - **Container Path**: The path of the container in which the molecule is located. Path levels are separated by `|`.
    - **Molecule Name**: The name of the molecule.
    - **Value**: The initial amount or concentration of the molecule in the container.
    - **Units**: The unit of the initial amount or concentration.
    - **IsPresent**: If `true`, the molecule is considered as present in the container. If `false`, the molecule is considered as not present in the container.
    - **Scale Divisor**: A number by which the value is divided. Can improve numerical stability for very large or very small values. 1 by default.
    - **Neg. Values Allowed**: If `true`, negative values are allowed for the molecule in the container. If `false`, negative values are not allowed.

{% hint style="info" %}
Values defined by a formula cannot be imported from Excel.
{% endhint %}

- **Export to Excel**: Export the IC BB information to an Excel file. The exported file has the same format as described for the import.

{% hint style="warning" %}
Only entries for molecules that are defined by a constant value (not by a formula) can be exported to Excel!
{% endhint %}

- **Extend from Initial Conditions Building Block**: Adds entries from the Initial Conditions BB previously exported to pkml. New values are always *added*, existing values are *overwritten*.
- **Extend from Expression Profile Building Block**: Adds entries from an Expression Profile BB previously exported to pkml. New values are always *added*, existing values are *overwritten*. Useful when creating a custom expression profile as initial condition.

The editor of the IC BB has the following buttons (multi-select of the rows is possible):

- **Delete**: Removes the selected entries
- **Refresh values**: 
- **Present**: Sets the IsPresent status of all selected entries to `true`
- **Not Present**: Sets the IsPresent status of all selected entries to `false`.

{% hint style="info" %}
A molecule is considered as **not present** in a container in a simulation if the simulation configuration contains no IC BB where the molecule is marked as present in the container.
{% endhint %}

{% hint style="info" %}
Restricting the presence of molecules to certain organs may improve your computing performance, but use it carefully to keep your model valid!
{% endhint %}

- **Negative Values Allowed/Not Allowed**: Toggles the setting if negative values are allowed for the selected entries. If disabled (by default for all molecules), a simulation will fail if the molecule amount becomes negative during the simulation.

The table view shows the following:

- **Molecule Name**: The name of the molecule.
- **Path Element N**: Represents the N-th level in the hierarchical container path within the spatial structure where the molecule is located.
- **Value**: The initial amount or concentration of the molecule in the container.
- **Scale Divisor**: A number by which the value is divided. Can improve numerical stability for very large or very small values. 1 by default.

{% hint style="info" %}
Internally, very small numerical values are divided by the scale divisors to get to an order of magnitude which is reasonable for the solver. The purpose is to reduce numerical noise and to enhance computation performance. This is also important when working with a broad variety of magnitudes of values. The scale divisors specify a typical scale for each species. Per default, all scale divisors are set to 1. If you work with very small amounts and/or a broad variety of magnitudes of values and your simulation yields implausible results (numerical noise, negative values, etc.), use the **Calculate Scale Divisor** of the to adjust the scale divisor for computational purposes.
{% endhint %}

- **Is Present**: If `true`, the molecule is considered as present in the container. If `false`, the molecule is considered as not present in the container.
- **Neg. Values Allowed**: If `true`, negative values are allowed for the molecule in the container. If `false`, negative values are not allowed, and the simulation will fail if the species becomes negative during the simulation.

{% hint style="info" %}
Entries for molecules and/or containers that do not exist in the final model will be ignored.
{% endhint %}

## Creating IC BB‌

To create a new IC BB in a module, right-click on the module and select **Add Building Blocks** from the context menu. In the dialog that opens, select **Initial Conditions** and enter a unique name for the new BB. Click **OK** to create the new IC BB.

The new IC BB does not contain any information yet. To populate it with information, you can either import the information from an Excel or a pkml file, or create new entries.

### Extending from existing BBs

The best way to add entries to an IC BB is to use the **Extend** functionality. This allows you to automatically create entries for selected molecules in all physical containers of a selected spatial structures BB. To do so:

1. Click on the **Extend** button in the **Edit** group of the **Edit Initial Conditions** ribbon tab.
2. A window opens that allows you to select a spatial structure BB and one or more molecules.

This will add entries for all selected molecules in all physical containers of the selected spatial structure BB. When new entries are added, the initial values or formulas are set to their default values as defined in the selected molecules building block, and these values are used for all containers in the selected spatial structure. All molecules are set to the status `IsPresent` in all selected physical containers of the selected spatial structure BB.

### Adding new entries

To manually add new entries to an IC BB:

1. Click on **New Initial Condition** button in the **Edit** group of the **Edit Initial Conditions** ribbon tab.
2. A new row is added to the table view. Enter the **Molecule Name** and the **Path** of the container in which the molecule is located. You can use auto-completion for both fields.

{% hint style="info" %}
The path is composed of different levels of the spatial structure. If the current view of the IC BB does not show enough columns to enter all levels (e.g., after creating a new IC BB, no path levels are shown), you can right click on any column header and select **Column Chooser** from the context menu. In the dialog that opens, you can select which levels of the spatial structure you want to be shown as columns in the table view.
{% endhint %}

3. Enter the initial **Value** of the molecule in the container. The unit can be selected from a combobox. The value can be either an amount or a concentration, depending on the project settings. Alternatively, assign a formula that will be used to calculate the initial value. You can either create a new formula, select an existing one, or copy-and-paste a formula from another building block.

{% hint style="info" %}
For our **test model**, create new molecule start values and set the concentration of molecule "A" in "Vial2" to 0. Then, set the concentration of "PGP" to 1 µmol.
{% endhint %}
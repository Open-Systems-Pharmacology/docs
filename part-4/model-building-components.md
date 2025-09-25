# Model Building and Model Components

After having made yourself familiar in the previous chapters with the building block concept and with the general structure of the program and projects ([“MoBi® - First Steps”](first-steps.md)), this section describes the practical approach how to build MoBi® models by stepwise entering content into the building blocks. Also, this knowledge is of use to upgrade models imported from PK-Sim®, as will be described in [Setting up a Simulation](setting-up-simulation.md).

{% hint style="info" %}
Always watch for the helpful tool tips that appear when hovering for a few seconds with the mouse pointer over an input box or its description.
{% endhint %}

## Exporting and importing building blocks‌

You may also load and save an entire Spatial Structure building block as pkml file. This is described in detail for molecules in [Loading, Editing, and Saving Molecules](model-building-components.md#loading-editing-and-saving-molecules) and applies also for a spatial structure.

{% hint style="info" %}
A collection of template files with predefined building blocks is automatically installed together with MoBi® in the default program data directory. The entry "Templates" in the program start menu in the "MoBi" program group will lead you to the proper path.
{% endhint %}

In a similar way, you can **save an entire molecules building block**.

1. In the Modules explorer, right-click the building block of interest, and select **Save As** from the context menu.
2. Select a location where it is saved in the file browser window that will open and select a name to save it.

You can **load such a molecule building block** into a  module that *does not have a molecules BB* by right-clicking the module and selecting **Load Building Blocks**. Also, you can use any saved molecules building block to **load individual molecules** from it into other projects, using the **Load Molecule** function described above.

Any molecules building block can also be **removed** (i.e., deleted) and **renamed** using the corresponding context menu functions.

## Keywords

- `MOLECULE`
- `SOURCE`
- `TARGET`
- `<NBH>`

## Parameters, Formulas, and Tags‌

In all building blocks that are now created, there may be a need to create and edit parameters, to work with formulas or other elements like tables. This section describes the general options you have for parameters and formulas, and the general procedures to work with them.

Parameters are typically listed in a separate tabbed view, named "Parameters"; compare the figures within this Chapter for their exact location which will vary, depending on the building block. A parameter is used to describe physical or physiological properties of a molecule, a reaction or transport, a spatial structure, an event or an application.

For improved readability, two categories of parameters exist: "regular" and "advanced" parameters. In any parameter list of a building block, a checkbox exists above the list which is named ![Image](../assets/icons/Unchecked.png) **Show Advanced Parameters**. If this box is checked, only those parameters tagged as "advanced" are displayed. Any parameter can be tagged as being "advanced" by checking the box ![Image](../assets/icons/Checked.png) **Advanced Parameter** when a parameter is created or edited.

Parameters can be newly created, copied, moved, edited, or loaded from a pkml file:

* A parameter is added by clicking on the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Parameter** button that is present in a parameter tab view, or by right-clicking the building block item's name (molecule, reaction, etc.) in the tree, list, or diagram view and choose **Create Parameter** from the context menu that appears.
* Instead of newly creating a parameter, you may also load it from a file. Use the **Load Parameter** button or context menu entry for this purpose and select a pkml file (e.g., a previously saved building block or simulation) that already contains a suitable parameter.
* A third option is to **copy and paste parameters** between building block items by pressing **Ctrl+C** (on the source parameter, like from an already entered molecule or reaction) and **Ctrl+V** after moving to the target area and after clicking into the empty parameter space. Instead of **Ctrl+C** to copy a parameter, you can use **Ctrl+X** to cut a parameter from its current position.

Within the different building blocks, there are slight differences in the procedure and in the selectable options which will be explained in the corresponding sections in this chapter. In the Molecules and Reactions building blocks, parameters may be of **different types**: Local and Global. As these names already suggest, the differences are the following:

* Parameters defined as Local can only be used locally, i.e., within the corresponding reaction or for a molecule where a local parameter is defined.
* Parameters defined as Global can also be used in other formulas, i.e., they appear in the reference lists described in [Working with Formulas](model-building-components.md#working-with-formulas). Furthermore, they are located in different places of a simulation hierarchy, as described in [Molecular Properties](setting-up-simulation.md#molecular-properties).

{% hint style="info" %}
A change of the parameter type will influence the path wherever this parameter is used in a formula (compare [Working with Formulas](model-building-components.md#working-with-formulas)).

Furthermore, this different path will make this parameter appear in different locations within the simulation hierarchy. Global parameters appear below the reaction list in the top level hierarchy, local parameters below the reaction list in the container level where the reaction occurs.
{% endhint %}

Any parameter needs to have a **Dimension** assigned to it or the option Dimensionless has to be selected from the Dimension combobox. This feature is needed for the automatic dimension validation provided by MoBi®. Typical dimensions are concentration, volume, time, or the more complex dimensions for flow or rate constants.

{% hint style="info" %}
If the box Validate Dimensions is ![Image](../assets/icons/Unchecked.png) unchecked in Utilities -> Options -> General, the dimension field is not used in the model.
{% endhint %}

A parameter can be assigned to a **Group** using the combobox of the field. This information is only used for display purposes to show the list of parameters in e.g. a given container and will enable a grouped view instead of default flat view. You can switch from flat to grouped view by ticking the **Group parameters** box.

In the combobox of the field **Formula Type**, you can select if the parameter is defined as:

* a constant, consisting of a numeric value and a unit;
* a formula, having a formula name and a formula string (i.e., a mathematical expression) including references to the formula items;
* a table, using individual data pairs from which a value is interpolated over the simulated time;
* a value distributed around a constant value or between two limits (only available for parameters of spatial structure containers);
* a calculation method parameter, whose formula will be defined depending on the selected calculation method of each molecule in the model (only available for parameter of spatial structure container). Currently, this calculation method cannot be edited within MoBi® and is imported from PK-Sim® together with the parameter.

In the bottom part of the **Create** or **Edit** window are several input options that have different effects on the parameter:

* Checking ![Image](../assets/icons/Checked.png) **Parameter is state variable** will open additional input fields for the right hand side of a differential equation (explained in detail in [State Variable Parameters](model-building-components.md#state-variable-parameters)).
* Checking ![Image](../assets/icons/Checked.png) **Plot Parameter** will tag this parameter so that it can be visualized in a chart with the simulation results (see [Chart Component](../part-5/chart-component.md)).
* Checking ![Image](../assets/icons/Checked.png) **Advanced Parameter** will hide this parameter from the lists if

Show Advance Parameters is ![Image](../assets/icons/Unchecked.png) un-checked in the parameter list view.

* For all parameter types, **a description can be added** into the input box at the bottom, for example to quote a reference. Clicking into the text field will open an edit dialog into which you can enter or paste any text of your choice.

You may also **add tags to any parameter** which is done by first clicking the **Tags**

tab in the parameter window. This will switch you to the tag list view.

* To add a tag, click the "Add Tag" button and enter the tag in the input box.
* To delete a tag, click the symbol that appears behind every tag in the list.

Parameter tags are used for the evaluation of formulas of the type "Sum", see [Sum Formulas](model-building-components.md#sum-formulas). The general rationale behind tags is explained in, [How Tags are used](model-building-components.md#how-tags-are-used).

Each parameter can be edited by selecting it from the parameter list, upon which the parameter edit dialog right of the list is updated to show the selected parameter, then allowing to edit it.

### Working with Constant and Distributed Parameters‌

A constant parameter is simply entered as a number in the field **Value**. You may use decimal points, exponential notation, and minus signs (e.g., 2.34; 1.2E-6;

\-150). Next to the value, its unit will be shown; the default unit is selected by your choice in the Dimension field, but it can be changed to other units listed in the combobox, e.g. from 1/min to 1/sec or 1/h.

Examples for constant parameters are given below, like the property "Molecular weight" for a molecule (see [Molecule Parameters](model-building-components.md#molecule-parameters)) or the rate constant for a reaction (see [Reaction Kinetics](model-building-components.md#reaction-kinetics)).

**Distributed parameters** (only available for parameters of spatial structure containers) describe a variation around a constant value or between two numerical limits. Within a given MoBi® simulation, a distributed parameter has a fixed value (default defined by the value in the field **value**). A distributed parameter can be used only to calculate the percentile of the parameter value given a certain distribution. Distributed parameters are useful if population statistical data are to be defined within a model. To define such a parameter, use the **Create Distributed Parameter** command from the context menu of a spatial structure item, like for containers (e.g. organ sizes) or neighborhoods (e.g., blood flow rate). In addition to what is entered for constant parameters, the **Distribution Type** has to be selected. Available options are:

* Discrete Distribution, which is identical to a constant parameter; this feature is implemented for the purpose of simply disabling the distribution function without going through the parameter creation process again.
* Uniform Distribution, where a parameter will be uniformly distributed between a **Minimum** and a **Maximum**, both have to be defined as numeric values. This is done by the same rules for value and units as used for the constant parameter value.
* Normal Distribution, where a parameter is varied around a **Mean** value using a **Standard Deviation** - both values have to be specified.
* LogNormal Distribution, where a parameter is logarithmically varied around a **Mean** value using a **Geometric Standard Deviation** - both values have to be entered.

If you use one of the different distributions, a **percentile** will be automatically calculated for the parameter value define in field **value** given the defined distribution. The functionality of this feature is particularly useful in combination with the script toolboxes for MoBi®.

### Working with Formulas‌

A parameter can be defined by a formula that may also use other parameters. A formula string defines the formula. Additionally to parameters, formulas are used in the kinetics equations of reactions and transport processes as well as in the monitor equation of observers. See the corresponding sections for a description. To define a formula, select Formula in the combobox **Formula Type**.

Each formula needs a formula name. The combobox **Formula Name** allows you to select from already existing formulas or to enter a new name. A new formula can be entered by clicking the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Formula** button and you will be asked for the formula name. Then press **Enter** or click **OK** to return to the main window.

{% hint style="info" %}
It is a good idea to use a name related to the object where the formula is used (e.g., parameter, reaction, observer) - you may even use identical names here.
{% endhint %}

To enter or edit a **formula string**, click into the unnamed input box above the **Description** field and then use your keyboard. This formula string will be evaluated by the solver once the simulation is run. It is written as a mathematical term that comprises numeric values, arithmetic operation signs, and names of parameters or their alias names. As long as the formula has errors or is incomplete, a red error sign <img src="../assets/icons/ErrorProvider.svg" data-size="line"> is displayed left of the empty input box. Hovering the mouse over this warning symbol will show you a tool tip on the validity of the equation (e.g., missing references or syntax errors).

{% hint style="info" %}
Useful workflows with parameter aliases or with reference paths to aliases are described below, see [Reaction Kinetics](model-building-components.md#reaction-kinetics) and [Passive Transports](model-building-components.md#passive-transports).
{% endhint %}

In a formula, the following characters may be used:

* numbers can be entered as described for constants
* the arithmetic operation signs **+**, **-**, **\***, **/**, **^** (for exponents)
* round brackets **(** **)**
* the constants **pi** and **e**
* the mathematical functions **ACOS**, **ASIN**, **ATAN**, **COS**, **COSH**, **EXP**, **LN**, **LOG** (identical to **LN**, natural logarithm), **LOG10**, **MAX**, **MIN**, **POW**, **SIN**, **SINH**, **SQRT**, **TAN**, **TANH**; if two operators are required (**MAX**, **MIN**, **POW**), a semicolon is used for separation, e.g., _POW(3;2)_ which corresponds to _3^2_
* the random number generator functions **RND** and **SRND**, both to be used with the dummy argument **()**
* if conditions, using the notation `<condition> ? <formula string for true> : <formula string for false>`
* in the conditions, the operators **<**, **>**, **<>**, **>=**, **<=**, **=** ; alternatively: **LT**, **GT**, **NEQ**, **GEQ**, **LEQ**, **EQ**, for which the use is `<function>(<expression1>;<expression2>)`
* conditions can be composed out of sub-conditions that are logically connected by **AND**, **OR**, or inverted by **NOT**. An alternative symbol for **AND** is **&**; an alternative symbol for **OR** is **|**. Besides logical conditions, the numbers 0 and 1 can be used as arguments.

- `TIME` variable: The simulation time.

{% hint style="info" %}
The above mathematical functions are defined as in the C programming language. For standard reaction kinetic models, these functions are not required at all. It is recommended to use events rather than "if conditions" in a formula.
{% endhint %}

Furthermore, defined **aliases** can be used in a formula as described in the next paragraph.

{% hint style="warning" %}
As opposed to mathematical functions, constants, and operators aliases are case sensitive.
{% endhint %}

Below the formula name and above the formula string, there is a **Reference Table** showing a header line above the columns named **Alias**, **Path**, and **Dimension**. On the right hand side of the reference table, there is a second table (separated by a vertical bar) titled **References to add**. From this left part, references are moved to the right Reference Table part by drag & drop.

{% hint style="info" %}
In some cases, e.g. when working with formula-defined molecule parameters, it may be helpful to expand this window to have enough working space. To do so, use the vertical bars between the window sections and drag them with the mouse.
{% endhint %}

References can be of two different kinds:

* An **absolute path** reference specifying the complete path to a referenced object (e.g., parameter, another formula). An example for this would be "Organism| Organ|Volume".
* A **relative path** reference specifying the truncated path relative to the current formula. The expression ".." is used for "one level up", using a structure similar to that of file systems paths. An example for such a relative reference would be "..|..|Volume".

You need to choose between absolute and relative path by selecting the corresponding radio button in the References to add a section of the window. If you select relative, you will be asked for a **Local Reference Point**. This reference point depends on the level on which you create your formula (e.g., the organism or an organ level) and may be specified in the expandable selection tree (see below). Recommendations of how to choose your reference point are given within this chapter. Click **OK** to finalize your selection.

The selected local reference point will be displayed with its absolute path in the "References to add" window. In case you need to correct or alter the local reference point, click on the **...** icon right of the path. This will re-open the reference point selection window.

To add a reference to a formula, after having selected the reference point:

1. Find the reference by name in the **Possible Referenced Objects** tree. Click on the + signs in the displayed tree to get to deeper levels of selectable points.
2. Click on the object's name, then drag it to the Reference Table area left to it; drop it there by releasing the mouse button. The object will be added to the list, usually with its name as the alias. If that name already exists in the list, the alias name is automatically renamed by adding a number. The path and dimension of the object are also added.

{% hint style="warning" %}
Not all entries in the tree are allowed to be moved to the left, depending on the context of the formula. A + sign displayed next to the mouse pointer indicates an allowed reference.
{% endhint %}

1. If needed, you may edit the alias name of the object manually. Alias names need to be identical to the names that are used in the formula string. Simply click on the alias name and change or override (or copy/paste) the name. For example, if you added several "Concentration" parameters from different molecules to a reaction kinetics equation, it may be helpful to manually add the molecule name next to them.
2. In the same way as for aliases, it is also an option to manually edit the path. However, the standard procedure would be to remove the object and add it again, using a new local reference point.
3. Dimensions can be changed by clicking on the displayed dimension and selecting a different one from the combobox.

{% hint style="info" %}
A reference path may also contain a global part, like "|MOLECULE", which is recognizable by being written in all capital letters. The reference to "|MOLECULE" means that this part of the path refers to a parameter or property of the currently evaluated molecule, whatever its name. This is useful in formulas that are computed for all molecules present in a container. Compare the formulas in [Observers](model-building-components.md#observers) or [Passive Transports](model-building-components.md#passive-transports). A global reference is selected automatically by MoBi® where appropriate.
{% endhint %}

To **remove an object from the reference list**, right-click it and select **Remove**from the context menu.

Clicking on the **Formulas tab** in the edit window will show a list of all formulas used in the reaction building block. This list is a quick overview of formula names within one building block. Clicking on a formula in the list will show the references and the equation for the selected formula. Right-clicking on a formula in the list opens a context menu that allows you to **Rename**, **Clone** and **Remove** formulas.

### Sum Formulas

In addition to the formulas described in the previous section, sum formulas can be used to calculate sums of a specified parameter name. As a selection criterion, parameter tags can be specified.

To define a parameter or a reaction by a sum formula, use the following procedure:

1. Select Sum Formula in **Formula Type** combobox.
2. To create a new sum formula, click the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Formula** button, upon which you will be asked for the formula name. Then press **Enter** or click **OK** to return to the main window.
3. In the **Formula Name** combobox, you may alternatively select an existing sum formula name.
4. In the **Parameter Criteria** field, right click into the empty white space and select either a New match tag condition. (The New not match tag condition is available too if needed). You will then be asked to enter a tag to match; or select one after clicking the combobox arrow. All parameters carrying the specified condition will be summed; if more than one condition is used, they will be connected with a logical AND. The general rationale behind tags is explained in (How Tags are used]\(#how-tags-are-used).
5. Conditions can also be removed using the context menu that appears when right-clicking into the white space in the **Parameter Criteria** field.

### Working with Tables‌

A parameter can be defined by a table that is made up out of pairs of simulation- time and corresponding functional value. The parameter value as a function of time that is used in the simulation will be interpolated between these values. To enter a table:

1. Select Table as **Formula Type**. A table layout will open below the Formula Type combobox.
2. To create a new table formula, click the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Formula** button, upon which you will be asked for the formula name. Then press **Enter** or click **OK** to return to the main window.
3. In the **Formula Name** combobox, you may alternatively select an existing table formula name.

{% hint style="warning" %}
A formula name needs to be entered or selected before entering any value points.
{% endhint %}

1. To add a data point, click the **Add Value Point** button.
2. Enter a time value in the **X** (Time) input box and a parameter value in the **Y** value input box. Units of the values can be selected as described for a constant parameter value.
3. You may check **Restart Solver** box in case the solver generates errors when arriving at these time points.
4. More data points can be entered by clicking **Add Value Point** again, or by clicking on the button in the right to the values lines. You can delete a data pair by clicking the **delete** button .
5. If you would like to use the first derivative of the interpolation, check **Use Derivative Values**. Values before the first and after the last data point of the series are set to 0.

{% hint style="info" %}
Data points cannot be edited, but have to be deleted and newly entered. Data point units can be changed, leading to a recalculation of the associated value to its new unit.
{% endhint %}

### Working with Table Formulas with Offset‌

A table described in [Working with Tables](model-building-components.md#working-with-tables) may need to be reused and shifted by a constant time value. For example, PK-Sim® uses this logic to build up repeated advanced application protocols (compare [PK-Sim® - Administration Protocols](../part-3/pk-sim-administration-protocols.md)). To enter a table formula with offset:

1.  Select Table Formula with Offset as **Formula Type**.
    
2.  To create a new table formula with offset, click the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Formula** button, upon which you will be asked for the formula name. Then press **Enter** or click **OK** to return to the main window.
    
3.  In the **Formula Name** _combobox_, you may select an existing table formula with offset.
    
4.  In the box below the formula name, there is a selection to a **path with a table object**. Upon clicking the "..." icon, you can select one such object from a path tree. This must be a parameter, a transport or a reaction defined by a table defined as described in [Working with Tables](#working-with-tables). Only when you select a valid object, the <img src="../assets/icons/OK.svg" data-size="line"> **OK** button will become active, and you can successfully continue.
    
5.  Below the table object path, there is a selection to a **path with an offset object**. Upon clicking the "..." icon, you can select one such object from a path tree. This must be a parameter containing a time, i.e., its dimension has to be Time.

Only when you select a valid object, the <img src="../assets/icons/OK.svg" data-size="line"> **OK** button will become active, and you can successfully continue. The X values of the table selected before will be shifted by the constant time value given in the selected parameter of this step.

### State Variable Parameters‌

A parameter can also be defined as state variable. This means, that the parameter value is defined by a differential equation. To do this, click the ![Image](../assets/icons/Checked.png) checkbox **Parameter is state variable** when entering or editing a parameter. The parameter value of a parameter _p_, for example, is defined as: ![Image](../assets/images/part-4/6p-rhs.png), with ![Image](../assets/images/part-4/6p-6t.png) representing the expression for _change of parameter value per unit time step_ defined by the formula on the right hand side (_RHS_). Once the checkbox is active ![Image](../assets/icons/Checked.png), the parameter edit view is extended by an additional input box for a formula. This formula defines the **Right Hand Side** of the parameter's differential equation. This right hand side equation itself is entered in the same way as a constant or formula type parameter. The formula in the top half of the parameter edit view now defines the initial condition for the differential equation of the parameter. The value of the parameter is defined when the differential equation is solved during the simulation of the model.

{% hint style="warning" %}
Once the ![Image](../assets/icons/Unchecked.png) **Parameter is state variable** checkbox is deactivated again, the input box for the RHS will disappear. The parameter is no longer a state variable, and the right hand side (RHS) formula reverts to RHS = 0. If you have accidentally deactivated the checkbox and then reactivate it, the formula you may have previously defined as RHS is not lost, since all created formulas are stored. To reinstate the formula you may have previously defined as the RHS, select the formula from the combobox after the formula type explicit formula is selected.
{% endhint %}

### How Tags are used‌ - container criteria for formulas, observers, transports, and events‌

Containers and neighborhoods within a spatial structure, elements of an application, or parameters may be labelled with tags. These tags, together with the name given to a container or neighborhood, may be used for selectively enabling observers, active or passive transports, or events. They are used for formula evaluations of the formula type "sum".

Tags can be entered when creating or editing a tag-carrying entity. The detailed procedures are described within this chapter in the corresponding sections describing spatial structures, observers, events, or parameters. Generally, one or more names are entered in a special input window of the corresponding entity.

Conditions are evaluated in fields of observers, transports, or event groups titled "In Container with" or "Between Containers with". Conditions can be combined using either **AND logic** (`Condition1 AND Condition2 AND ...`), or **OR logic** (`Condition1 OR Condition2 OR ...`).
 
Imagine the following simple model structure:

```
Organism (logical)
  |
  +-- Container A (logical)
  |      |
  |      +-- Container A1 (physical)
  |      +-- Container A2 (physical)
  |
  +-- Container B (logical))
         |
         +-- Container B1 (physical)
         +-- Container B2 (physical)
```

A molecule `Molecule A` is present in the physical containers `A1`, `A2`, `B1`, and `B2`. Each container has a parameter `Param A`, including the molecule.

The physical containers have additionally the parameter `Concentration`.

{% hint style="info" %}
The following examples demonstrate the concept of tags and container criteria. They are not meant to represent a physiologically meaningful model.
{% endhint %}

If we create a sum formula with the following conditions:

1. **Match tag condition**: the condition is fulfilled when the tag name is matched.
    - For the sum formula with match tag condition "Param A", the sum will include the following parameters:
        - `Organism|Param A`
        - `Organism|Container A|Param A`
        - `Organism|Container A|Container A1|Param A`
        - `Organism|Container A|Container A1|Molecule A|Param A`
        - `Organism|Container A|Container A2|Param A`
        - `Organism|Container A|Container A2|Molecule A|Param A`
        - `Organism|Container B|Param A`
        - `Organism|Container B|Container B1|Param A`
        - `Organism|Container B|Container B1|Molecule A|Param A`
        - `Organism|Container B|Container B2|Param A`
        - `Organism|Container B|Container B2|Molecule A|Param A`

2. **Not match tag condition**: the condition is fulfilled when the tag name is **not** matched.
    - For the parameter `SumOfParameters` with the conditions `Not tagged with: Param A` and `Not tagged with: SumOfParameters` (the latter is required to avoid a circular reference), the sum will include the following parameters:
        - `Organism|Container A|Container A1|Volume`        
        - `Organism|Container A|Container A1|Molecule A|Concentration`
        - `Organism|Container A|Container A2|Volume`
        - `Organism|Container A|Container A2|Molecule A|Concentration`
        - `Organism|Container B|Container B1|Volume`
        - `Organism|Container B|Container B1|Molecule A|Concentration`
        - `Organism|Container B|Container B2|Volume`
        - `Organism|Container B|Container B2|Molecule A|Concentration`
     **AND** molecule amounts
        - `Organism|Container A|Container A1|Molecule A`
        - `Organism|Container A|Container A2|Molecule A`
        - `Organism|Container B|Container B1|Molecule A`
        - `Organism|Container B|Container B2|Molecule A`

3. **In Container**: the condition is fulfilled by all model entities located in the specified container and its children.
    - For the parameter with the condition "In Container with: Organism", the sum will include the following parameters:
        - `Organism|Param A`
        - `Organism|Container A|Param A`
        - `Organism|Container A|Container A1|Param A`
        - `Organism|Container A|Container A1|Volume`        
        - `Organism|Container A|Container A1|Molecule A|Concentration`
        - `Organism|Container A|Container A1|Molecule A|Param A`
        - `Organism|Container A|Container A2|Param A`
        - `Organism|Container A|Container A2|Volume`
        - `Organism|Container A|Container A2|Molecule A|Concentration`
        - `Organism|Container A|Container A2|Molecule A|Param A`
        - `Organism|Container B|Param A`
        - `Organism|Container B|Container B1|Volume`
        - `Organism|Container B|Container B1|Molecule A|Concentration`
        - `Organism|Container B|Container B1|Param A`
        - `Organism|Container B|Container B1|Molecule A|Param A`
        - `Organism|Container B|Container B2|Param A`
        - `Organism|Container B|Container B2|Volume`
        - `Organism|Container B|Container B2|Molecule A|Concentration`
        - `Organism|Container B|Container B2|Molecule A|Param A`
     **AND** molecule amounts
        - `Organism|Container A|Container A1|Molecule A`
        - `Organism|Container A|Container A2|Molecule A`
        - `Organism|Container B|Container B1|Molecule A`
        - `Organism|Container B|Container B2|Molecule A`

    - For the parameter with the condition "In Container with: Container A", the sum will include the following parameters:
        - `Organism|Container A|Param A`
        - `Organism|Container A|Container A1|Param A`
        - `Organism|Container A|Container A1|Volume`        
        - `Organism|Container A|Container A1|Molecule A|Concentration`
        - `Organism|Container A|Container A1|Molecule A|Param A`
        - `Organism|Container A|Container A2|Param A`
        - `Organism|Container A|Container A2|Volume`
        - `Organism|Container A|Container A2|Molecule A|Concentration`
        - `Organism|Container A|Container A2|Molecule A|Param A`
     **AND** molecule amounts
        - `Organism|Container A|Container A1|Molecule A`
        - `Organism|Container A|Container A2|Molecule A`

4. **Not in Container with**: the condition is fulfilled for all model entities that are **not** in the specified container or any of its children.

5. **In Parent**: the condition is fulfilled by all model entities located in the specified container and its children. This can be considered as a special case of "In Container", where the container is the parent of the entity being considered.

6. **In Children**: the condition is fulfilled by any model entity in all children of the parent container of the entity for which the criteria is defined. 

    - For the parameter with the condition "In Childre" located in `Organism|Container A`, , the sum will include the following parameters:
        - `Organism|Container A|Container A1|Param A`
        - `Organism|Container A|Container A1|Volume`        
        - `Organism|Container A|Container A1|Molecule A|Concentration`
        - `Organism|Container A|Container A1|Molecule A|Param A`
        - `Organism|Container A|Container A2|Param A`
        - `Organism|Container A|Container A2|Volume`
        - `Organism|Container A|Container A2|Molecule A|Concentration`
        - `Organism|Container A|Container A2|Molecule A|Param A`
     **AND** molecule amounts
        - `Organism|Container A|Container A1|Molecule A`
        - `Organism|Container A|Container A2|Molecule A`

More than one condition can be combined for evaluation; the combinations are connected with a logical AND. The detailed procedures when and how to enter tag conditions are described in this chapter ([Sum Formulas](model-building-components.md#sum-formulas), [Transport Processes](model-building-components.md#transport-processes), [Observers](building-block-concepts.md#observers), [Events and Applications](model-building-components.md#events-and-applications)).

Models generated in **PK-Sim**® make extensive **use of tags**: For example, open a PK-Sim® model and look under [Passive Transports](model-building-components.md#passive-transports) for one part of the blood flow through the organs of an organism called "MassTransferBloodPool2OrgPl". This is a passive transport process that occurs from the arterial plasma compartment to the plasma compartments of all organs except for the lung. Consequently, this transport process is occurring under the following conditions:

1. Source container: tagged with "Arterial Blood" and tagged with "Plasma".
2. Target container: tagged with "Plasma" and not tagged with "Arterial Blood" and not tagged with "Lung".

Similarly, observers or events can be included or excluded from being created in different parts of the spatial structure. The molecule observer "Fraction excreted", for example, makes use of the tag "Urine", so this observer is only created in the urine container.

# Parameter Values Building Blocks

The Parameter Values (PV) Building Block (BB) defines the values of various parameters present in the simulation structure. By default, a PV BB should only contain values that are different from the default values defined in the building blocks where the parameter is defined.

Additionally, PV BB can **create** new parameters during simulation creation.

The following section describes the functionalities of the PV BB. Later on, a simple [example](#example---creating-pv-bb) is given to create a new PV BB and populate it with information.

## Parameter Values - Functionality‌ Overview

In contrast to other BB types except for the initial conditions BB, **multiple** PV BBs can be created within one module. This allows you to define different parameterization sets for different simulation scenarios. For example, different parameter sets may represent different disease states or different species. During simulation creation, you can select which PV BB to use.

The context menu of a PV BB offers the following commands:

- **Save As PKML**: Save the PV BB as a pkml file.
- **Clone**: Create a copy of the selected PV BB in the same module.
- **Import from Excel**: Import PV BB information from an Excel file. The excel file must have the following columns:
    - **Container Path**: The path of the container in which the parameter is located. Path levels are separated by `|`. For example, `Organism|Liver`.
    - **Parameter Name**: The name of the parameter. For example, `Volume`.
    - **Value**: The value of the parameter.
    - **Units**: The unit of the value.

{% hint style="info" %}
Values defined by a formula cannot be imported from Excel.
{% endhint %}

- **Export to Excel**: Export the PV BB information to an Excel file. The exported file has the same format as described for the import.

{% hint style="warning" %}
Only entries for parameters that are defined by a constant value (not by a formula) can be exported to Excel!
{% endhint %}

- **Extend from Parameter Values Building Block**: Adds entries from the Parameter Values BB previously exported to pkml. New values are always *added*, existing values are *overwritten*.
- **Extend from Expression Profile Building Block**: Adds entries from **Parameters** tab of an Expression Profile BB previously exported to pkml. New values are always *added*, existing values are *overwritten*. Useful when creating a custom expression profile as initial condition.
- **Extend from Individual Building Block**: Adds entries from the Individual BB previously exported to pkml. New values are always *added*, existing values are *overwritten*. Useful when trying to overwrite individual-specific parameters.

The editor of the PV BB has the following buttons (multi-select of the rows is possible):

- **Delete**: Removes the selected entries

The table view shows the following:

- **Parameter Name**: The name of the molecule.
- **Path Element N**: Represents the N-th level in the hierarchical container path within the spatial structure where the parameter is located.
- **Parameter Value**: The initial amount or concentration of the molecule in the container.
- **Formula**: The formula used to calculate the parameter value. If a formula is assigned, the value is `<Not Available>`.
- **Dimension**: The dimension of the parameter.

{% hint style="info" %}
For *state variable* parameters, the **Value** is the initial value of the parameter.
{% endhint %}

## Creating new parameters in simulation structure through PV BB‌

A PV BB can be used to create new parameters that do not exist in the model yet. This can be useful to define parameters that are only relevant for a specific simulation scenario.

If parameter `Param A` in the container `Organism|Organ A|Container A1` does not exist in the model yet, but is defined in a PV BB that is selected during simulation creation, the parameter will be created in the specified container with the specified value.

The parameter will only be created if the parent path (i.e., `Organism|Organ A|Container A1`) exists in the model. If the parent path does not exist, the parameter will not be created and a warning will be shown during simulation creation.

## Creating Parameter Values Building Blocks‌

To create a new PV BB in a module, right-click on the module and select **Add Building Blocks** from the context menu. In the dialog that opens, select **Parameter Values** and enter a unique name for the new BB. Click **OK** to create the new PV BB.

The new PV BB does not contain any information yet. To populate it with information, you can either import the information from an Excel or a pkml file, or create new entires.

### Adding new entries

To manually add new entries to an IC BB:

1. Click on **New Parameter Value** button in the **Edit** group of the **Edit Parameter Values** ribbon tab.
2. A window appears that allows you to select parameters from a path tree on the left side. The parameters are grouped as follows:
    - **Spatial Structures**: List of spatial structures in all modules of the project. Expand a spatial structure to see its containers (including the neighborhoods). Within the containers, you will find the parameters defined for the container and for the molecules present in the container.
    - **Individuals**: List of individuals in all modules of the project. Expand an individual to see its parameters.
    - **Expression profiles**: List of expression profiles in all modules of the project. Expand an expression profile to see its parameters.
    - **Events**: List of events building blocks in all modules of the project.

Parameters of the reactions and transport processes are not available for selection at this point.

Select the desired parameter and click **Add**. You can multi-select parameters.

3. Alternatively, you can type in the full path of the parameter in the **Parameter Paths to Add** box on the right. Multiple paths can be added, separated by a new line. For example:
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

- You have created a custom spatial structure and want to add protein expression information to it.
- You want to overwrite the protein expression information in a custom PV BB to reflect a specific disease state.
- etc.

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
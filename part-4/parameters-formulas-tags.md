# Parameters, Formulas, Tags‌, and Keywords

This section describes in details how to work with the important concepts of modes building in MoBi.

First, different types of [parameters](#parameters) and their properties are explained.

Then, the use of the different types of [formulas](#working-with-formulas) is described. Formulas are used to define parameters, reaction kinetics, transport processes, observer equations, and molecule initial conditions.

Following is the explanation of the [tag concept](#how-tags-are-used). Tags are widely used to define conditions for for localization of observers, transport processes, events, parameters, as well as for sum formulas.

Finally, the special [keywords](#keywords) that can be used in paths to define references in formulas are listed.

## Parameters

### Functionality Overview‌

In all building blocks, there may be a need to create and edit parameters. Parameters are typically listed in a separate tabbed view, named "Parameters". A parameter is used to describe physical or physiological properties of a molecule, a reaction or transport, a spatial structure, an event or an application.

For improved readability, two categories of parameters exist: "regular" and "advanced" parameters. In any parameter list, a checkbox exists above the list which is named ![Image](../assets/icons/Unchecked.png) **Show Advanced Parameters**. If this box is unchecked, the parameters tagged as "advanced" are hidden. Any parameter can be tagged as being "advanced" by checking the box ![Image](../assets/icons/Checked.png) **Advanced Parameter** when a parameter is created or edited.

Parameters can be created, copied, moved, edited, or loaded from a pkml file:

- A parameter is added by clicking on the <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Parameter** button that is present in a parameter tab view, or by right-clicking the building block item's name (molecule, reaction, etc.) in the tree, list, or diagram view and choosing **Create Parameter** from the context menu that appears.
- Instead of creating a parameter, you may also load it from a file. Use the **Load Parameter** button or context menu entry for this purpose and select a pkml file (e.g., a previously saved building block, module, or simulation) that already contains a suitable parameter.
* A third option is to **copy and paste parameters** between building block items by selecting a parameter and pressing **Ctrl+C** and **Ctrl+V** after moving to the target area and after clicking into the empty parameter space. Instead of **Ctrl+C** to copy a parameter, you can use **Ctrl+X** to cut a parameter from its current position.

Within the different building blocks, there are slight differences in the procedure and in the selectable options which will be explained in the corresponding sections in this chapter. In the Molecules and Reactions building blocks, parameters may be of the types **Local** and **Global**.

- **Global** parameters are considered a property of a molecule or a reaction that does not depend on the location of the molecule or reaction (e.g., "Molecular Weight" of a molecule, or a reaction rate constant). These parameters are listed under the molecule/reaction node in the root of the simulation tree, and are accessed by the path `<MOLECULE/REACTION>|<parameter name>`, e.g., `Cimetidine|Molecular weight`.

- **Local** parameters are parameters whose values depend on the location of the molecule or reaction, e.g., "Concentration" of a molecule, or the apparent $K_{M,app}$ that depends on the concentartion of the inhibitor (see [PK-Sim - Defining Inhibition/Induction Processes](../part-3/pk-sim-compounds-defining-inhibition-induction-processes.md)). These parameters are listed under the molecule or reaction node in each container of the simulation tree, and are accessed by the path `<ContainerPath>|<MOLECULE/REACTION>|<parameter name>`, e.g., `Organism|VenousBlood|Plasma|Cimetidine|Concentration`, or `Organism|Liver|Periportal|Intracellular|Midazolam-CYP3A4-Metabolization|Km_app`.

Any parameter has a **Dimension**, and the value can be represented in different **Units**. The list of all supported dimensions can be found in [Appendix A.1](../appendix.md#a1-all-dimensions-and-base-units).

{% hint style="warning" %}
When using a parameter in a formula, the value is always internally converted to the base unit of the dimension. For example, if a parameter with the dimension "Concentration (molar)" is defined with the unit "nmol/l", its value will be converted to "µmol/l" when used in a formula.
{% endhint %}

A parameter can be assigned to a **Group** by selecting one of the pre-defined groups from a drop-down list. This information is used for display purposes only. By selecting the **Group parameters** box in a parameter tree view, parameters will be grouped by their assigned group name.

{% hint style="info" %}
It is not possible to create new groups. The list of available groups is predefined and cannot be changed.
{% endhint %}

In the combobox of the field **Formula Type**, you can select if the parameter is defined as:

* a **constant**, consisting of a numeric value and a unit;
* a **table**, using individual data pairs from which a value is interpolated over the simulated time;
* a **formula**, having a formula name and a formula string (i.e., a mathematical expression) including references to the formula items;
* a **table with offset**, which is a table that is reused and shifted in time by a constant time value defined in another parameter;
* a **table formula with x-argument**, which is a table that is reused and evaluated at a value defined in another parameter;
a *sum formula**, which calculates the sum of all values with a certain condition;
* a **calculation method** parameter, whose formula will be defined depending on the selected calculation method of each molecule in the model (only available for parameter of spatial structure container). The calculation methods cannot be edited within MoBi® and are imported from PK-Sim®.
* a value **distributed** around a constant value or between two limits (only available for parameters of spatial structure containers).

The different formula types are explained in the section [Formulas](#formulas).

In the bottom part of the **Create** or **Edit** window are several input options that have different effects on the parameter:

* Checking ![Image](../assets/icons/Checked.png) **Parameter is state variable** will open additional input fields for the right hand side of a differential equation (explained in detail in [State Variable Parameters]#state-variable-parameters)).
* Checking ![Image](../assets/icons/Checked.png) **Plot Parameter** will tag this parameter so that it can be visualized in a chart with the simulation results (see [Chart Component](../part-5/chart-component.md)).
* Checking ![Image](../assets/icons/Checked.png) **Advanced Parameter** will hide this parameter from the lists if **Show Advance Parameters** is ![Image](../assets/icons/Unchecked.png) un-checked in the parameter list view.

* For all parameter types, **a description can be added** into the input box at the bottom, for example to quote a reference. Clicking into the text field will open an edit dialog into which you can enter or paste any text of your choice.

You may also **add tags to any parameter** in the **Tags** tab of the parameters editor. Tags are used to label parameters for selective evaluation in sum formulas (see [Sum Formulas](#sum-formulas)). The application of tags is explained in [How Tags are used](#how-tags-are-used).

* To add a tag, click the "Add Tag" button and enter the tag in the input box.
* To delete a tag, click the symbol that appears behind every tag in the list.

### Constant Parameters‌

A constant parameter is defined by a constant **Value**. You may use decimal points, exponential notation, and minus signs (e.g., 2.34; 1.2E-6; -150). Next to the value, its unit will be shown; the default unit is selected by your choice in the Dimension field, but it can be changed to other units listed in the combobox, e.g. from 1/min to 1/sec or 1/h.

Examples for constant parameters are "Molecular weight" of a molecule or the rate constant of a reaction.

### Distributed Parameters‌

**Distributed parameters** (only available for parameters of spatial structure containers) describe a variation around a constant value or between two numerical limits. Within a given MoBi® simulation, a distributed parameter has a fixed value (default defined by the value in the field **value**). A distributed parameter can be used only to calculate the percentile of the parameter value given a certain distribution. Distributed parameters are useful if population statistical data are to be defined within a model. To define such a parameter, use the **Create Distributed Parameter** command from the context menu of a spatial structure item, like for containers (e.g., organ sizes) or neighborhoods (e.g., blood flow rate). In addition to what is entered for constant parameters, the **Distribution Type** has to be selected. Available options are:

- **Discrete Distribution**, which is identical to a *constant parameter*. This feature is implemented for the purpose of simply disabling the distribution function without going through the parameter creation process again.
- **Uniform Distribution**, where a parameter will be uniformly distributed between a **Minimum** and a **Maximum**.
- Normal Distribution, where a parameter is varied around a **Mean** value using a **Standard Deviation** - both values have to be specified.
- LogNormal Distribution, where a parameter is logarithmically varied around a **Mean** value using a **Geometric Standard Deviation** - both values have to be entered.

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

## Formulas

## Keywords

- `MOLECULE`
- `SOURCE`
- `TARGET`
- `<NBH>`
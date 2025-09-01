# Molecules‌

The Molecules building block contains all molecules with their default start values, molecule-specific parameters and properties. A molecule has a name, typically the name of the compound. Parameters and properties can be defined by you to describe the physico-chemistry, like solubility or lipophilicity. These parameters may later be used in reactions, passive and active transport processes, or may influence events. Also, active transporter molecules and transport processes are defined for each molecule, if relevant for the model.

Start by opening a Molecules building block for editing. In the **Building Block Explorer**, open the Molecules folder and edit the Molecules building block by either right-clicking it and selecting "Edit", or by double-clicking on it. A new tab with an empty space will open. This is the work space where you can add new molecules or load molecules from other projects. You may notice that the ribbon of the MoBi® window has changed, being tabbed "Edit Molecule", to offer you clickable ribbon buttons for molecule-related actions (compare in [Enter Molecules](first-steps.md#enter-molecules)).

### Creating New Molecules‌

To create a new molecule:

1. Click in the newly visible ribbon **Add** on the button <img src="../assets/icons/AddAction.svg" data-size="line"> **New**, or right-click into the Diagram area (the empty space below the tab "Molecules") and choose **Create Molecule** from the context menu that appears. A new window titled "New Molecule" will open.
2. Enter a molecule name into the "Name" input box.
3. Alternatively, a molecule can be created based on a PK-Sim® template. This can be achieved by using the button **PK-Sim Molecule** in the **Add** ribbon or **Add PK-Sim Molecule** from the context menu in the diagram area.
4. Enter a name for the PK-Sim molecule and the four physicochemical properties as listed.

At this point, you may already input a value for the "Default Start Amount" which is set to zero by default. Also, you may define molecule parameters after clicking on the "Parameters" tab of the "New Molecule" window (see below). Both operations, however, can also be done after the molecule is created (see below), which is finalized by pressing the **Enter** key or by clicking **OK**. The newly created molecule name now appears in the left part of the Molecules edit tab, and a tab on the right shows the properties of the molecule.

![New Molecule window](../assets/images/part-4/new-molecule-window.jpg)

### Loading, Editing, and Saving Molecules‌

Alternatively to newly creating a molecule, **molecules can be loaded from a pkml file**. This file can be

* a PK-Sim® export containing molecules (see [Export to \*.pkml file for MoBi®](../part-3/importing-exporting-project-data-models.md#export-to-pkml-file-for-mobi), for how to create such a file),
* an entire previously saved MoBi® simulation,
* a saved Molecules building block from a previous project,
* or a previously saved molecule file.

{% hint style="info" %}
A collection of template files with predefined building blocks is automatically installed together with MoBi® in the default program data directory. The entry "Templates" in the program start menu in the MoBi program group will lead you to the proper path.
{% endhint %}

Use one of such files an proceed in the following way:

1. Click the <img src="../assets/icons/PKMLLoad.svg" data-size="line"> **Load** ribbon button, or right-click into the empty space below the tab "Molecules" and choose **Load Molecule** from the context menu that appears.
2. Select a folder and then a pkml file from the file browser window that will open.
3. If the pkml file contains more than one molecule, select one or more from the list that is displayed. If one or more molecule names are already in use in the current project, you will be asked for alternative names.

You can **edit the molecule properties** for the molecule in the tree that is currently being highlighted.

* Within the properties window, the checkbox ![Image](../assets/icons/Unchecked.png) **Stationary** determines if the corresponding molecule will be transported by [Passive Transports](model-building-components.md#passive-transports) processes described below (see [Passive Transports](model-building-components.md#passive-transports)) - this box should thus be checked ![Image](../assets/icons/Checked.png) only for immobile molecules, like membrane-bound receptors or transporters.
* Select the **Molecule Type** specification from the combobox. This has only influence on the icon depicted in front of the molecules in the molecules tree view to the right. Selectable options are <img src="../assets/icons/Molecule.svg" data-size="line"> Drug, <img src="../assets/icons/Enzyme.svg" data-size="line"> Enzyme, <img src="../assets/icons/Transporter.svg" data-size="line"> Transporter, !<img src="../assets/icons/Complex.svg" data-size="line"> Complex,<img src="../assets/icons/Metabolite.svg" data-size="line"> Metabolite ,<img src="../assets/icons/Protein.svg" data-size="line"> Protein, and Other Protein.
* The **Default Start Amount** determines what default value will be used whenever "Molecule Start Values" are created (see “Molecule Start Values”). The value should be left on 0 for all molecules which only will be created in the process of the simulation. For complex spatial structures, it might be an alternative strategy to set all default start amount values to 0 and set everything manually in the molecule start values for those containers where a molecule is present in known concentrations.
* The **Used Calculation Methods** at the bottom right of the edit window shows three comboboxes for the selection of calculation methods for the distribution of the molecule within a model exported from PK-Sim®. The calculation method defines which method is used to calculate parameter values of parameters located in the "Spatial Structure" ("MoleculeProperties") which have the **Formula Type Calculation Method**. These selections are only needed if you want to use distribution methods from PK-Sim®. Otherwise, leave them on No Calculation Method. For further information on this subject, please refer to the discussion of the different distribution models in the PK-Sim® manual ([Simulations](../part-3/pk-sim-simulations.md)). If you select a certain "Calculation Method" you can get tool tip information on the equations and specific parameters used in the "Calculation Method" by hovering with the mouse over the "Category" entry.

To **save a molecule** as pkml file:

1. Right-click on its name in the molecules tree, and select **Save As** from the context menu.
2. Select a location where it is saved in the file browser window that will open and select a name to save it.

In a similar way, you can **save an entire molecules building block**.

1. Go to the Building Block Explorer, right-click your building block (the default name would be "Molecules", it would be the level under the building block group "Molecules"), and select **Save As** from the context menu.
2. Select a location where it is saved in the file browser window that will open and select a name to save it.

You can **load such a molecules building block** into any project by right-clicking the building block group (top level) and selecting **Load Molecules Building Block**. Also, you can use any saved molecules building block to **load individual molecules** from it into other projects, using the **Load Molecule** function described above.

{% hint style="info" %}
If you are frequently building models in MoBi® where new molecules have to be defined, it is a good idea to once configure your typical **default molecule** and save it in your working directory. You can then compile your molecules building blocks by repeatedly loading your default molecule and each time changing the name to your desired molecule names.
{% endhint %}

Any molecules building block can also be **removed** (i.e., deleted), **renamed**, or **cloned** (i.e., copied under a different name) using the corresponding context menu functions.

{% hint style="info" %}
The above operations, including save and load, are functions available for all other building blocks through the context menu that appears on right-clicking with the mouse at the corresponding positions.
{% endhint %}

### Molecule Parameters‌

Molecule parameters can created, loaded, copied, or changed after clicking on the Parameters tab in the right half of the window. For comprehensive information on parameters and parameter handling, see above [Parameters, Formulas, and Tags](model-building-components.md#parameters-formulas-and-tags).

A molecule parameter needs to have a name, a parameter type (Local, Property, or Global), a dimension, a value or a formula, and it may be a state variable.

* A typical local parameter is "Concentration", defined by the formula "Amount/ Volume".
* A typical property is "Molecular weight" which is used for calculating weight- based concentrations.
* An example for a global parameter might be a total start amount from which the start amounts of differently bound molecules are calculated.
* A description can be added into the input box a the bottom, like for giving a literature reference from where you obtained this value.

More examples for molecule parameters can be found by looking at a molecule in a simulation imported from PK-Sim®. If you enter a formula-defined or a state variable parameter, please refer to the [general section](model-building-components.md#parameters-formulas-and-tags) defining how to use this functionality.

As an example, we create the property "Molecular weight" for the molecule created above.

1. Click <img src="../assets/icons/AddAction.svg" data-size="line"> **Add Parameter**, and a "New Parameter" window will open.
2. Enter "Molecular weight" as parameter name.
3. Select the Parameter Type Property from the combobox and confirm the security question.
4. Select MolecularWeight in the Dimension combobox - you can narrow down your search by entering the first few characters after clicking this combobox field.
5. Leave "Formula Type" on Constant and enter the molecule's molecular weight in g/mol into the "Value" input box.
6. Finally, press the **Enter** key or click **OK**. The screen should look like in the screen shot below.

![Molecule building window](../assets/images/part-4/molecule-building-window.jpg)

As a second example, load the parameter "Concentration" from a PK-Sim® simulation export (see [Export to \*.pkml file for MoBi®](../part-3/importing-exporting-project-data-models.md#export-to-pkml-file-for-mobi) for how to create such a file).

1. Click the **Load Parameter** button or select it from the context menu.
2. Select a pkml file that you previously generated in PK-Sim® and select Concentration from the list. This local parameter is defined by a formula, and it is useful to have it in every molecule which is later used in a reaction kinetic equation.

{% hint style="info" %}
For a detailed description of the creation and use of formulas see below, [Reactions](model-building-components.md#reactions).
{% endhint %}

{% hint style="info" %}
For **continuing our test project**, enter three molecules and name them "A", "B", and "C". Uncheck the checkbox ![Image](../assets/icons/Unchecked.png) **Stationary** for each molecule to allow transport processes. Set the **Default Start Amount** for molecule "A" to 50 µmol and leave "B" and "C" at the default, 0 µmol. It will be needed to practice in the next sections.
{% endhint %}

### Active Transporter

In addition to the molecules described so far, active transporter molecules and transport processes related to them can be created. Since their use requires that a spatial structure and neighborhoods have been created, they and the dependent active transport processes are described below in [Active Transporter Molecules](model-building-components.md#active-transporter-molecules).
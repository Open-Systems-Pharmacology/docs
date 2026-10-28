# What's New in Version 13.1

This page lists the user-facing changes introduced in **Version 13.1** of the Open Systems Pharmacology Suite, relative to Version 13.0. Each entry links to the GitHub issue(s) where the change was tracked and, where available, to the section of this manual describing the feature.

## MoBi®

- **Final Options page in the simulation wizard** - the Create/Configure Simulation wizard ends again with a **Final Options** page, after the calculation methods page. It shows the validation options plus two new ones: **Show warnings for non-finite quantities** and **Check for negative values** (solver setting). The options are stored per simulation; the user settings are only the defaults for new simulations, and the wizard no longer changes them. In the User Settings, "Warn for non-finite quantities" moved into the Validation Options list and was renamed **Show warnings for non-finite quantities**. ([MoBi #1737](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1737), [Core #3020](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/3020))
- **Diagrams redrawn with DevExpress** - reaction and spatial structure diagrams use a new diagram control. Existing projects and layout templates load unchanged. Related removals:
  - The **Diagram** tab of the simulation editor is removed.
  - The **AutoLayout** context menu items (children, grandchildren, all descendants) are removed. Reaction diagrams keep the layered layout; spatial structures are laid out from templates.
  - The spatial structure diagram is for layout only. Neighborhoods are created from the Neighborhoods node, not by dragging between containers. The bird's-eye overview strip is gone.
  - Diagram options for observer nodes/links, transport links and default observer size are removed.
  ([MoBi #2570](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2570), [Core #2988](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2988), [Core #2994](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2994))
- **Organs collapsed by default** - in the spatial structure diagram, organs are collapsed when they first appear. Organs the user has expanded stay expanded. ([MoBi #1939](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1939))
- **Xenobiotic checkbox for molecules** - the molecule editor has a new **Xenobiotic** checkbox next to **Stationary**. ([MoBi #2492](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2492))
- **New Initial Conditions works like Add Parameter Values** - **New Initial Condition** now opens a dialog to select molecules in physical containers (multi-select) and adds their paths. Dimension and display unit are taken from the molecule; MoBi lists any paths that do not match a molecule in the project. ([MoBi #1841](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1841))
- **Dimension of added parameter values** - when adding parameter values by path, the dimension and display unit are set from the matching parameter in the project. The reminder to set the dimension now lists only the paths that could not be resolved. ([MoBi #1676](https://github.com/Open-Systems-Pharmacology/MoBi/issues/1676))
- **Rename results comparisons** - the context menu of a results comparison has a new **Rename** item. ([MoBi #282](https://github.com/Open-Systems-Pharmacology/MoBi/issues/282))
- **Open the template building block from a simulation** - double-clicking a building block under a simulation in the Simulation Explorer opens the project's building block. Double-clicking a molecule opens its Molecules building block with that molecule selected. ([MoBi #2590](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2590))
- **Warnings kept when a simulation cannot be created** - if building the model fails, the Notifications view now lists the error together with the warnings collected before it. ([MoBi #2253](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2253))
- **Formula editor cleared** - when the last formula of a building block is deleted, the formula editor pane is cleared instead of showing a stale formula and a validation error. ([MoBi #2181](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2181))
- **Clearer error messages** - Excel quantity import names a unit that differs only in capitalization and suggests the correct one. Reloading observed data whose importer configuration is not in the project shows a message instead of crashing. ([MoBi #2550](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2550), [MoBi #2578](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2578))

## PK-Sim®

- **Open the template building block from a simulation** - double-clicking a used building block or observed data under a simulation opens the project's building block or observed data. ([PK-Sim #3854](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3854))
- **Reaction diagram redrawn with DevExpress** - the simulation reaction diagram uses the new diagram control (read-only, as before). ([PK-Sim #3827](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3827))
- **Grid editors open on the first click** - in several grids (grouping, protein selection, events, observers, import dialogs, and others) editors, drop-downs and buttons react on the first click instead of the second or third. ([PK-Sim #3810](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3810))
- **Favorites checkbox with several rows selected** - the checkbox toggles on the first click. ([PK-Sim #3808](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3808))
- **Drop-down buttons in population analysis grids** - Line Style, Symbol, Unit and Scaling show their button only on the selected cell. ([PK-Sim #3809](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3809))

## Shared (PK-Sim® and MoBi®)

- **Delete several folders at once** - selecting multiple simulation folders offers **Delete > Folders and Data** and **Delete > Folders and Keep Data**. ([Core #2970](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2970), [PK-Sim #3657](https://github.com/Open-Systems-Pharmacology/PK-Sim/issues/3657), [MoBi #2483](https://github.com/Open-Systems-Pharmacology/MoBi/issues/2483))
- **Grid copy menu items renamed** - "Copy Table", "Copy Selected Rows" and "Copy Selection" are now "Copy Table as Text", "Copy Selected Rows as Text" and "Copy Selection as Text", so they are not confused with copying objects. ([Core #3048](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/3048))
- **Legend order** - dragging legend entries on the chart is removed. Change the order by dragging curves in the Curves editor. ([Core #2483](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2483))
- **Journal diagram redrawn with DevExpress** - the working journal diagram uses the new diagram control. ([Core #2994](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2994))
- **Rectangle zoom kept** - the zoomed range is kept after hiding a curve or resizing the chart. ([Core #2968](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2968))
- **Duplicate output mapping in parameter identification** - mapping the same observed data to the same output twice now gives a validation error instead of a crash. ([Core #2873](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2873))
- **Removing new meta data rows** - removing a meta data row that was added but not saved no longer adds a property without a name. ([Core #2417](https://github.com/Open-Systems-Pharmacology/OSPSuite.Core/issues/2417))

## No UI change

Reviewed, no visible UI change: MoBi #1862 (PKML keeps simulation changes), #2559, #2364, #2082, #2580, #2574; PK-Sim #3831, #1887, #3578, #3802, #3777, #3837; Core #3018, #2724, #2781, #2991, #2801, #3002, #3004, #3000, #3022, #3044; Utility #62; SimModel #214, #215, #109, #221; OSPSuite-R #2017.

Closed without a fix (not planned or duplicate): MoBi #2409, #2417; PK-Sim #3001, #3356; Core #2719; OSPSuite-R #2013. Core #1675 is closed as completed but has no linked PR.

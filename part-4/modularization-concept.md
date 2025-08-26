# Modularization Concept in MoBi

Starting with version 12, the OSP Suite introduces a new modularization concept for building models in MoBi. This new concept allows users to create, share, and re-use models more efficiently by breaking them down into smaller, manageable components called **modules**.

This section provides an overview of the modularization concept, and is especially suited for users familiar with previous versions of MoBi. It explains the advantages of using modules, how to create and manage them, and which rules the combination of modules follows.

## MoBi project structure

A MoBi project contains a set of:

- PK-Sim modules
    - A module created from a PK-Sim PBPK model. As best practice, a PK-Sim module should not be modified. Instead, all changes/extensions to the model should be done in the so-called Extension modules (see below). A PK-Sim module is converted into an Extension module when edited by the user.
- Extension modules
    - Editable modules that contain any changes to the model structure made by the user.
- Individuals
- Expression Profiles
- Simulations, which are combinations of (0-n) PK-Sim modules, (0-n) Extension modules, (0-1) individual, and (0-n) expression profiles. At least one module (PK-Sim or Extension) must be selected to create a simulation.

## Commit/update changes

The workflow of commiting changes from a simulation to a building block and updating a simulation with changes from a building block has been changed.

### Updating a simulation with changes from a building block

If a building block used in a simulation is changed after the creation of the simulation, the simulation will automatically be marked as "outdated". To update the simulation with the changes from the building block, simply right-click on the simulation and select "Update from Building Blocks". This will invoke re-creating the simulation from the building blocks, applying any changes made to **all** building blocks since the simulation was created. Any changes to parameter or start values made in the simulation will be lost!

It is no longer possible to update only selected building blocks.

### Committing changes from a simulation to a building block

Changes to parameter or start values made in a simulation can be committed to the building block (BB) the parameter/start value belongs to. To do so, right-click on the simulation and select "Commit to building blocks".

Changes to parameters values are committed to the selected Parameter Values (PV) building block of the last module in the simulation configuration. If the last module does not contain a PV BB, or no PV BB has been selected for this module, new PV BB will be created.

{% hint style="warning" %}
When committing changes made to a simulation created from PK-Sim module(s) only, the last PK-Sim module will be converted to an extension module. To avoide this, create a new extension module that should contain the changes. Then create the simulation with the extension module.
{% endhint %}

Changes to initial conditions (IC) of molecules are handled similarly. They are committed to the selected IC BB of the last module in the simulation configuration. If the last module does not contain an IC BB, or no IC BB has been selected for this module, a new IC BB will be created.

Structural changes made to building blocks (e.g., adding/removing reactions, molecules, compartments, etc.) cannot be reverted by committing an "outdated" version of the building blocks from a simulation. Only changes to parameter values and initial conditions can be committed.

## Best practices

The OSP software is best suited for the development of complex quantitative systems pharmacology/toxicology (QSP/T) models based on the physiologically-based kinetics (PBK) modeling framework. With the introduction of the modularization concept, development of such models is even more efficient, transparent, and sustainable. To get the most out of the new concept, the following best practices should be considered.

- If possible, each compound should be represented as a separate PK-Sim module.
- PK-Sim modules should never be modified. Any modification and/or extensions should be implemented as separate modules.
- An extension module should be defined as generic as possible. I.e., it should be compatible with any PK-Sim module with minimal adjustments, if possible.
- Avoid duplication of information across modules - only implement the differences to other modules!

## Project conversion

To get the full advantage of the new modularization concept with the support of individuals and expression profiles in MoBi, you will require a PBPK model created with PK-Sim V12. For PK-Sim project created with previous version, the project must be re-created from a snapshot. Open your project in PK-Sim V12, export it to snapshot, and then re-load from snapshot (see documentation). After this, all simulations in the project will have the new structure and sending them to MoBi will properly transfer the individuals and expression profiles.

- When loading a simulation from a `*.pkml` file, one module will be created containing the entire model.
- When opening a MoBi project created with previous versions:
    - If the projects contains exactly one building block (BB) of each type (i.e., spatial structure BB, one reactions BB, on molecules BB, etc.), a single module will be created containing all the building blocks.
    - If the project contains multiple building blocks of the same type, a module will be created for each building block.

Due to the new structure of simulation configuration, changes in parameter values or initial conditions made in the simulations created with previous versions of MoBi cannot be committed to building blocks. When opening a project created with previous versions of MoBi, the simulations will be marked as "outdated", and a warning will be shown.
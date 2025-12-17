# Individuals

The **Individual** building blocks (BB) contain the species- and individual specific parameters describing the physiology. An expression profile is a list of parameter paths and values that define the physiological properties of an individual.

Specifically, the Individual BB contains parameters that are present only for certain species (e.g., `Organism|Lumen|Duodenum|Thickness_p1` is only present in the human species, but not in rat, `Organism|Lumen|Duodenum|Default thickness of gut wall` is present in the rat but not in human), **or** have different species-specific values (`Organism|Acidic phospholipids (blood cells) [mg/g] - RR`) **or** vary within a population (e.g., `Organism|Fat|Volume`).

For convenience, parameters that are defined in the Individuals BB can be shown in the spatial structure editor by selecting an individual in the "Show parameters from individual" box.

![Spatial structure view with an individual selected](../.gitbook/assets/modularization-concept-spatial-structure-individual-parameters.png)

When importing a PBPK model from PK-Sim, a new Individual is created.

In contrast to the other BB types, Individual BBs are not part of a module, but stored in a separate folder in the MoBi project explorer. They can be used in combination with any module of the project. Parameters that are defined in the Individual but are not present in the spatial structure are created during simulation creation. This behavior is similar to the Parameter Values BB.

## Individuals - Functionality Overview

Upon opening an Individual BB, the editor shows two tabs:

* **Parameters**: Lists all parameters, their values, and formula. Additionally, metadata such as species and individual characteristics (e.g., age, weight, height) are shown.

Values can be edited by user, but no new entries can be added or existing entries removed. To add physiological parameters for a new structure (e.g., a new organ), you need to create a Parameter Values BB in an extension module and add the new entries there.

An Individual can be saved as pkml and loaded as a parameter values BB in an Extension module.

## Creating New Individuals

New Individuals can be created in MoBi with access to the physiological database. Right-click on the **Individuals** folder in the MoBi project explorer and select **Add Individual**. The process is described in detail in the [Creating individuals](../part-3/pk-sim-creating-individuals.md) documentation.

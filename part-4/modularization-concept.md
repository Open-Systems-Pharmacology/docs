# Modularization Concept in MoBi

Starting with version 12, the OSP Suite introduces a new modularization concept for building models in MoBi. This new concept allows users to create, share, and re-use models more efficiently by breaking them down into smaller, manageable components called **modules**.

This section provides an overview of the modularization concept, and is especially suited for users familiar with previous versions of MoBi. It explains the advantages of using modules, how to create and manage them, and which rules the combination of modules follows.

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
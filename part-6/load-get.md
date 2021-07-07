Loading a simulation and accessing entities
===========================================

Loading a simulation
--------------------

In general, every workflow starts with loading a simulation by calling
the `loadSimulation()` function. The function receives the full path to
the PKML file (with extension \*.pkml) exported from PK-Sim or MoBi and
returns the corresponding simulation object.

    library(ospsuite)

    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)

    sim <- loadSimulation(simFilePath)

Accessing entities of the model and their properties - the path concept
-----------------------------------------------------------------------

Once the simulation is loaded, it is possible to retrieve various
entities of the model. The most important entities are **containers**,
**molecules**, and **parameters**. The methods `getContainer`,
`getMolecule`, and `getParameter` search for the respective entity with
the given `path` located under a `container`. `path` is a string where
the elements of the path (i.e., containers in the hierarchy of the
simulation) are separated by `|`. `container` is an instance of the
`Container`-class within the model structure the path is *relative* to.
In most cases, `container` is the `Simulation` object created by calling
`loadSimulation(pkmlSimulationFile)`.

    #Get the container "Liver"
    livContainer <- getContainer("Organism|Liver", sim)
    print(livContainer)
    #> Container: 
    #>   Container type: Organ
    #>   Path: Organism|Liver

    #Get the molecule Aciclovir located in kindey intracellular space
    moleculeInKid <- getMolecule("Organism|Kidney|Intracellular|Aciclovir", sim)
    print(moleculeInKid)
    #> Molecule: 
    #>   Path: Organism|Kidney|Intracellular|Aciclovir
    #>   Initial Value: 0.00 [µmol]

    #Get the parameter volume of the liver interstitial space.
    # Note that the path used is relative to the liver container
    livParam <- getParameter("Interstitial|Volume", livContainer)
    print(livParam)
    #> Parameter: 
    #>   Path: Organism|Liver|Interstitial|Volume
    #>   Value: 0.3533 [l]
    #>   isFormula: TRUE
    #>   formula: f_int*V
    #>   Value overrides formula: FALSE
    #>   isStateVariable: FALSE

The functions `getAllContainersMatching`, `getAllMoleculesMatching`, and
`getAllParametersMatching` return a list of objects representing all
entities whose paths match the generic paths provided in the list
`paths` located under `container`. Generic paths are constructed by
using the wildcard symbols `*` (exactly one occurrence of any element)
or `**` (zero or more occurrences of any element).

    # Get the parameter `Volume` of the intracellular space of all organs,
    # with exactly one path element before `Intracellular`
    volumeParams <- getAllParametersMatching("Organism|*|Intracellular|Volume", sim)
    length(volumeParams)
    #> [1] 15
    #The PBPK model has 15 organs with an "Intracellular" sub-compartment

    # Get the parameter `Volume` of the intracellular space of all organs,
    # no matter how many sub-containers the organ has
    volumeParams <- getAllParametersMatching("Organism|**|Intracellular|Volume", sim)
    length(volumeParams)
    #> [1] 28
    # The list also includes parameters of organs like "Liver|Periportal",
    # or the mucosal compartments of the intestine.

Note that the path `"Organism|Kidney|*|Intracellular|Volume"` will
return no parameters in the standard models, as there are no
sub-containers between `Kidney` and `Intracellular`. In contrast,
`"Organism|Kidney|**|Intracellular|Volume"` is a valid path.

The functions `getAllXXXMatching` can also be used to retrieve entities
from multiple paths:

    #Get the molecule Aciclovir located in `Liver|Periportal|Intracellular` and `VenousBlood|Plasma`
    molecules <- getAllMoleculesMatching(c("Organism|Liver|Periportal|Intracellular|Aciclovir",
                                           "Organism|VenousBlood|Plasma|Aciclovir"), sim)
    print(molecules)
    #> [[1]]
    #> Molecule: 
    #>   Path: Organism|Liver|Periportal|Intracellular|Aciclovir
    #>   Initial Value: 0.00 [µmol]
    #> 
    #> [[2]]
    #> Molecule: 
    #>   Path: Organism|VenousBlood|Plasma|Aciclovir
    #>   Initial Value: 0.00 [µmol]

The entities possess various properties that can be accessed through
their objects. The most important properties for a container are:

    # Path of the container
    livContainer$path
    #> [1] "Organism|Liver"

    # Parent container
    livContainer$parentContainer
    #> Container: 
    #>   Container type: Organism
    #>   Path: Organism

The most important properties for a molecule are:

    #Initial value of the molecule
    moleculeInKid$value
    #> [1] 0

    # Dimension of the molecule. See section "Unit conversion" for more information.
    moleculeInKid$dimension
    #> [1] "Amount"

    # Is the initial value defined by a formula?
    moleculeInKid$isFormula
    #> [1] FALSE

    # Type of the formula. CONSTANT if the value is defined by a constant.
    moleculeInKid$formula
    #> Formula: 
    #>   isConstant: TRUE

The most important properties for a parameter are:

    #Initial value of the parameter
    livParam$value
    #> [1] 0.3533005

    # Dimension of the parameter. See section "Unit conversion" for more information.
    livParam$dimension
    #> [1] "Volume"

    # Base unit of the parameter. See section "Unit conversion" for more information.
    livParam$unit
    #> [1] "l"

    # Is the initial value defined by a formula?
    livParam$isFormula
    #> [1] TRUE

    # Type of the formula. CONSTANT if the value is defined by a constant.
    livParam$formula
    #> Formula: 
    #>   isFormula: TRUE
    #>   formula: f_int*V

Loading simulation tree
-----------------------

A convenient way to traverse the simulation structure is given by the
method . The method generates a tree-like list of all paths within the
simulation. Each element of the tree contains all the sub-containers of
the element. The final elements are strings representing the path to the
entity.

    # Load simulation
    simFilePath <- file.path(getwd(), "..", "tests", "data", "Aciclovir.pkml", fsep = .Platform$file.sep)
    sim <- loadSimulation(simFilePath)

    # Create simulation tree
    simTree <- getSimulationTree(sim)
     
    # Calling simTree would list all entities within the simulation
    # Accessing the parameter "Organism|Weight"
    simTree$Organism$Weight
    #> $path
    #> [1] "Organism|Weight"
    # 
    # Getting all entities located under "Organism|Liver|Periportal|Intracellular"
    entitiesList <- simTree$Organism$Liver$Periportal$Intracellular

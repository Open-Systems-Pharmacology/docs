# Modeling Concepts - Modeling of Proteins‌

Therapeutic proteins are an increasingly important class of drugs. Particularly, monoclonal antibodies which are used for different indications including cancer, inflammatory and autoimmune diseases \[[88](../references.md#88)\]. Engineered antibody fragments with tailored pharmacokinetic properties have potential as diagnostic and therapeutic agents \[[34](../references.md#34)\].

The pharmacokinetics of protein therapeutics are governed by a number of unspecific and specific processes, most of which play either no or only a minor role in small molecule drug kinetics. Processes which have to be covered in order to describe the pharmacokinetics of protein therapeutics include \[[42](../references.md#42)\]:

*   Exchange across the vascular endothelium between plasma and interstitial space by convection and diffusion.
    
*   Return of the drug from interstitial space of the organs to circulation by lymph flow.
    
*   Degradation and protection from degradation by neonatal Fc receptor (FcRn) in cellular endosomes.‌
    
*   Target-mediated deposition and clearance.
    
PK-Sim® offers a model specifically designed to describe the pharmacokinetics of proteins and other macromolecules. This model was developed by extending the standard model for small molecules by a description of the transcapillary drug exchange, lymph flows and endosomal space including drug degradation and protection from degradation by the FcRn receptor.

Within this model, the transcapillary exchange of the drug is described by the two-pore formalism \[[58](../references.md#58)\], \[[57](../references.md#57)\], \[[3](../references.md#3)\]. According to this theory, the barrier between plasma and interstitial space is described as a membrane consisting of two types of pores: a few large and many small ones. Macromolecules can pass through these pores by convection as well as diffusion. In order to describe these processes, the endothelial permeabilities and osmotic reflection coefficients of the drug for the different organs are calculated within PK-Sim® from the Stokes radius of the drug and endothelial properties like pore radii and hydraulic conductivity \[[58](../references.md#58)\].

The FcRn sub-model is based on the model published by Garg and Balthasar \[[26](../references.md#26)\]. The fraction of drug that is bound to FcRn within the endosomal space is recycled to plasma and the interstitial space whereas the fraction not bound to FcRn is cleared from the endosomal space. In PK-Sim®, endosomes represent the endosome in the vascular endothelium only and serve as compartment for protein.

degradation and recycling of large proteins. Endogenous IgG is also represented which competes with the drug for the FcRn receptor. The clearance of the drug thus depends on its affinity to the FcRn receptor, the endosomal concentration of endogenous IgG and the endosomal concentration of the FcRn receptor. The main difference to the model published by Garg and Balthasar \[[26](../references.md#26)\] is that in the PK-Sim® model the binding to the FcRn receptor is explicitly represented and, thus, different affinities to the FcRn receptor can be specified for the drug and the endogenous IgG, respectively.

Nonspecific binding or specific binding of the therapeutic protein to its target can be added within PK-Sim®. Specific binding within a tumor or a detailed description of target mediated clearance by receptor internalization can be added within MoBi® based on a PK-Sim® protein model.
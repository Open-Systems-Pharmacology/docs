# Principles of PBPK Modeling

## Introduction to PBPK Modeling

Physiologically-based pharmacokinetic modeling is a mechanistic approach to describe the pharmacokinetics of a substance based on substance-specific properties and mammalian physiology, for which a substantial amount of prior biological information is used for model building, \[[92](../references.md#92)\], \[[93](../references.md#93)\], \[[95](../references.md#95)\], \[[96](../references.md#96)\], \[[97](../references.md#97)\], \[[14](../references.md#14)\], \[[22](../references.md#22)\], \[[69](../references.md#69)\].

The general idea, introduced as early as 1924 \[[31](../references.md#31)\], is to divide the body into physiologically relevant compartments, essentially important organs, and to set up a mass balance equation for each compartment describing the fate of the substance within that compartment \[[76](../references.md#76)\]. In PK-Sim®, a physiological framework model is provided where the mammalian body is divided into containers representing relevant organs or tissues as well as arterial and venous blood pools connecting the different organs through the blood flow. Organs are further sub-divided into several sub-compartments that describe essentially the vascular space divided into plasma and (red) blood cells as well as the avascular space divided into interstitial and cellular space. Such a model framework corresponds to a detailed compartmental model and provides the structural basis to describe the behavior of a substance.

For the simulation of the whole body, all mass balance equations are combined in a system of interdependent differential equations. In the simplest version of this system, all organs are connected in parallel between the arterial and venous blood pools such that blood flows from arteries to veins, except in the lung where the circulation is closed by a blood flow in the opposite direction.

When carrying out a simulation, this system of time-dependent differential equations is solved numerically. The primary results of such PBPK simulations are concentration-time-courses of the compound in the various compartments explicitly described in the equations. This means, besides the plasma concentration, at least one concentration curve for each organ is included in the output. Of course, derived PK parameters such as the area under the curve (AUC) or the maximum concentration (Cmax) can be calculated based on the primary output.

PBPK can also be well understood within ADME logic which is further detailed below:

## (L)ADME logic and routes of administration

The pharmacokinetics of a substance can be understood by considering its (liberation), absorption, distribution, metabolism, and excretion (ADME). While intravenously administered substances are directly available in the systemic circulation for distribution, substances administered e.g. orally, subcutaneously, or via inhalation need to be absorbed first. Also, in some cases, the substance might not be directly available for absorption but needs to be liberated first, in case an extended LADME scheme is of relevance.

### Liberation

Depending on the formulation of a substance, it might not be directly available for absorption processes. Certain formulations liberate the substance in a more or less controlled fashion and these processes can be included in PBPK models. Further details on modeling liberation in PK-Sim® are described in [PK-Sim® - Formulations](../part-3/pk-sim-formulations.md).

### Absorption

Substances not administered intravenously, generally have to be absorbed before being available in the systemic circulation. The most common route of administration for which absorption is a very important issue is oral (per os, PO) administration. Factors such as gastric emptying and intestinal transit time, stability and solubility of a substance or formulation, as well as the permeability across the intestinal wall based on passive and active transport processes are important for the fraction of a substance that is absorbed into the systemic circulation. Bioavailability is further determined by potential first-pass metabolization as described below. Historically, a plug-flow-with-dispersion model was used in PK-Sim® \[[93](../references.md#93)\]. From version 5.0 on, a compartmental gastro-intestinal model is used, which is further detailed and discussed in \[[79](../references.md#79)\] and \[[80](../references.md#80)\].

### Distribution

After having reached the systemic circulation, the compound may distribute into tissue and organs, which leads to a decrease in the plasma concentration. The (apparent) volume of distribution is an important PK descriptor, theoretically defined as the volume in which the total amount of drug would need to be uniformly distributed to produce the given plasma concentration of a compound. However, the physiological processes that determine this volume may be complex.

The basic passive processes, which determine the behavior of a substance in an organ, are mass transport via the blood flow, permeation from vascular space into organ tissue and partitioning between blood plasma and organ tissue. The level of detail used for the description of these processes in a PBPK model can vary significantly. For the description of the passive physical processes involved in partitioning into the organs, usually, two concepts are distinguished: blood flow limited and permeation limited partitioning. In the first case, all organs are assumed to be well-stirred compartments that equilibrate instantaneously with the plasma, and the time constant for the distribution of a substance into the peripheral organ is determined only by the blood flow rates. Alternatively, in models with permeation limitation, a permeation barrier is assumed between blood and organ tissue, resulting in a permeability dependence of the distribution and the corresponding time constants. Other important parameters determining the distribution behavior are the partition coefficients between the organ tissues and the blood plasma. These partition coefficients are given by the tissue to plasma concentration ratio under steady-state conditions.

Apart from the passive processes described above, active transport processes or binding to proteins, including the target, can strongly influence the distribution behavior.

The relative contribution of different processes to distribution also depends on the type of molecule. For small molecules, the blood endothelial in the different organs often does not constitute a major distribution hurdle. An exception is the very important blood-brain barrier. For larger molecules such as biologics, endothelial permeation can have a significant impact on the PK and additional processes such as the lymph flow is important for recirculation.

Further details and options for modeling distribution in PK-Sim® are described in Partition coefficient calculation methods”.

### Metabolism

Most substances are metabolized by enzymes in the organism. Often two distinct phases are distinguished: Phase I enzymes catalyze modifications that generally add functional groups to non-polar molecules; Phase II enzymes can then conjugate soluble molecules to these groups to allow a better elimination via the kidney or the gall bladder.

The products of such biotransformation steps are referred to as metabolites. If they are not active, they are often not further considered. However, metabolites can also constitute the pharmacologically active form of the substance or be responsible for side effects.

Generally, the liver is considered the most relevant organ for biotransformation. However, most metabolizing enzymes are also expressed in various other organs, even though often to a lower extent. Nevertheless, extra-hepatic metabolization can be very important. Mucosal clearance in the intestinal wall is just one prominent example. Together with first-pass clearance in the liver this process also influences the bioavailability of a substance \[[77](../references.md#77)\].

Metabolism is generally an active and substance-specific process. While the enzyme equipment is a property of the organism, it has to be considered for each substance which enzymes are relevant. Further details on modeling metabolization in PK-Sim® [are described in [ADME Properties](../part-3/pk-sim-compounds-definition-and-work-flow.md#adme-properties).

### Excretion/Elimination

Compounds and their metabolites are generally removed from the body via excretion or elimination processes. The two most prominent routes of excretion are via the kidney into urine and via biliary excretion into the intestine and further into the feces. During the latter process, re-absorption can lead to entero-hepatic circulation of a substance. While biliary secretion is generally mediated via active transport, urinary secretion can be passive (glomerular filtration) or also due to active transport (tubular secretion). Other special routes of elimination can include exhalation via the lungs.

Just as the metabolization processes, the transporter "equipment" is a property of each individual organism. It has to be considered for each substance which transporters are relevant and whether or not the substance is subject to glomerular filtration. Further details on modeling excretion and elimination in PK-Sim® are described in [ADME Properties](../part-3/pk-sim-compounds-definition-and-work-flow.md#adme-properties).

## PBPK model parameterization

Due to its physiological basis, most parameters in a PBPK model are independent of substance knowledge or PK measurements. For example, information on blood flow rates, compartment volumes or composition, e.g. in terms of volume fractions of water, proteins, and lipids, can be implemented independently of the substance.

For establishing PBPK models to describe virtual humans, the physiological knowledge is not restricted to average individuals. For many parameters, their distribution within different populations is known in an age-dependent or subject-specific manner allowing population PK predictions or extrapolations rather than fitting to data for interpolation. PBPK models can also be established for different animal species. With an established animal PBPK model at hand, for example, the physiological parameters can be substituted to make the first prediction for humans. The physiological correspondence of parameters enables both a good interpretation of results as well as a translation to new scenarios of application. Consequently, PBPK models are well-established in environmental toxicology and risk assessment fields and are becoming increasingly popular also in pharmaceutical research. In addition, PBPK models automatically provide exposure estimates at the site of action and, therefore, provide a natural basis to build multiscale PK/PD models and thereby provide a good platform for knowledge integration along the pharmaceutical research and development process \[[85](../references.md#85)\].

Besides this general information on mammalian physiology, PBPK models make use of generic distribution models. Using these models, only a few basic physicochemical parameters of the substance such as molecular weight, lipophilicity, and protein binding can be used to determine relevant passive processes such as permeabilities across membranes and partition coefficients between compartments in order to describe the PK behavior. Additional parameters are required for the representation of active processes such as transport or enzyme-catalyzed metabolization.

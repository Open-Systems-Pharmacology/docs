# Documentation

While PBPK modelling is applied to inform decision making in the pharmaceutical industry to e.g. inform go/no-go decisions, formulation development, a dosing strategy in pediatrics or a DDI strategy one should keep in mind that PBPK modelling is a robust tool to support drug/chemical safety or toxicity risk assessment in general.

Independent of whether PBPK modelling is used for internal decision making or for decisions by regulators, a minimum level of documentation is recommended to facilitate traceability and, later on, review by regulators. This minimum level of documentation should allow for establishing the link between data, data transformations and manipulation, final model/simulation code, and conclusions in order to facilitate traceability. The manuscript “Good practices in model-informed drug discovery and Development (MID3): Practice, Application and Documentation” [[169](../references.md#169)] provides an overview on different levels of documentation (memo, report), a suggestion for documentation of analysis plans and reports including high-level guidance for authors with respect to content and audience. Guidance on documentation of assumptions and assessment of assumptions during model development is also provided . A recent publication by Tan et al. focuses on PBPK model reporting for chemical risk assessment, expanding the already existing guidances for pharmaceutical applications by recommending additional elements that are relevant to environmental chemicals, providing a more general and harmonized framework for reporting of PBPK models [[170](../references.md#170)].

## Documentation during the conduct of an analysis
It is recommended to create a summary of the parameter identification steps describing all relevant steps and tested models leading to the current best model. It is recommended to capture the following information: 
- Analysis dataset used for parameter identification 
- Simulations included  
- Rationale for the model / hypothesis tested  
- Outcome/evaluation of the parameter identification step 
- Parameters used in final model
  
Most of the commercial PBPK software offer a built-in tracking of parameter identification steps such as e.g. the journal function in OSP.

## Reporting (including analysis plans) of PBPK analysis
FDA and EMA have both issued guidance documents for the industry on reporting of PBPK analysis outlining the recommended format and content of a report for regulatory submissions [[125](../references.md#125)], [[126](../references.md#126)]. The EMA guidance clarifies their expectation on qualifying a PBPK platform for the intended use. 

A more detailed overview on sections to be included in such a report and guidance on expected content in each section is provided in Table 4 of a review on “Physiologically Based Pharmacokinetic Model Qualification and Reporting Procedures for Regulatory Submissions: A Consortium Perspective” by [[128](../references.md#128)]. The outlined sections are in line with the MID3 recommendations and the FDA guideline. Supplements to this publication include a template for analysis plans and reports. 

A more recent publication [[170](../references.md#170)] focuses on PBPK model reporting for chemical risk assessment applications. It expands the existing guidances [[125](../references.md#125)], [[126](../references.md#126)], [[128](../references.md#128)] for pharmaceutical applications to support the assessment of the safety of environmental chemicals. The publication provides very detailed expectations towards the content of each section which go beyond the level of detail as provided by the existing guidelines. While Tan et al. address underlying modelling assumptions as part of the method section, Marshall et al. and Shebley et al. suggest a stand-alone section including documentation of assessing the impact of uncertainties in the assumptions taken.
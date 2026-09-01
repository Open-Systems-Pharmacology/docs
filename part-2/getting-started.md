# Getting Started

## Software and Hardware Requirements

| OS | Windows 10®, Windows 11®, Windows Server 2019®, Windows Server 2022®, Windows Server 2025® |
|-------------------|-----------------------------------------------------|
| Processor | minimum 1 GHz (the faster, the better) |
| Memory | 2 GB RAM, 4+ GB recommended |
| Disk space | minimum 2 GB |
| .NET | .NET 10 Windows Desktop Runtime - 64bit; it is installed automatically by the OSP Suite setup if it is not present |
|  | **Optional software** |
| R® | version 4.4 or higher - 64bit |

The information provided above refers to the core components of the Open Systems Pharmacology Suite, including PK-Sim® and MoBi®. Both PK-Sim® and MoBi® can be installed as stand-alone software packages to reduce the disk space required.

{% hint style="warning" %}
The Open Systems Pharmacology Suite includes interfaces to MS Excel® and R. These are separate programs that are not available within the Open Systems Pharmacology Suite. You need to have these programs installed to use their interfaces!
{% endhint %}

### Trademark Information

Excel® is a registered trademark of Microsoft Inc., Redmond, USA; R is a product of the R Foundation for Statistical Computing, Vienna, Austria.

## Installation and Update

### Core Components

{% hint style="warning" %}
To correctly install the software, administrator rights are necessary. If you do not have these rights, your IT administrator should carry out the installation.
{% endhint %}

{% hint style="info" %}
The modular structure of the Open Systems Pharmacology Suite is explained in [Modules, Philosophy, and Building Blocks](modules-philsophy-building-blocks.md). Both PK-Sim® and MoBi® can be installed as stand-alone applications. However, to obtain the full modeling and simulation capabilities, we recommend that both programs are installed.
{% endhint %}

To install the Open Systems Pharmacology Suite core components:

1.  Download installation packages from [http://setup.open-systems-pharmacology.org/](http://setup.open-systems-pharmacology.org/).

2.  Start the **OSPSuite-Full.X.Y.Z.exe**\* (where X.Y.Z is a program version, e.g. 13.0.x) from the menu Start -\> Run or from Windows Explorer.

3.  Follow the instructions of the installation program. In most cases, the installation should be carried out with the default settings.

4.  In most cases, you will have to restart your computer following installation.

5.  Download PK-Sim® [gene expression databases](https://github.com/Open-Systems-Pharmacology/Gene-Expression-Databases/releases) and copy them to a folder accessible for all users.

6.  Configure PK-Sim® gene expression databases (for details, see [PK-Sim® - Options](../part-3/pk-sim-options.md)).

### Update

Newer versions of the Open Systems Pharmacology Suite are installed in the same way as described above. Version 13 is installed side by side with older versions, so projects created with a previous version remain usable until they have been converted.

Projects created with an older version are converted when they are opened for the first time. Details of the conversion are described in [Conversion of Projects from Previous Version](../part-3/conversion-projects-from-previous-version.md) for PK-Sim® and in [Project conversion workflows](../part-4/reuse-of-project-information-from-previous-versions.md) and [Converting v12 projects to v13](../part-4/converting-v12-projects-to-v13.md) for MoBi®.

### Installation Validation

The **Installation Validator** enables "1-Click" validation of an OSP Suite installation on a target computer, e.g., for the documentation of an installation in a regulated environment. It executes a predefined set of simulation scenarios using the PK-Sim® [command-line interface](../part-3/pk-sim-command-line-interface.md) and compares the calculated results with validated reference values shipped with the tool. A scenario passes if the simulated times deviate by less than 0.01% and the simulated values by less than 3% from the reference values. The outcome of the validation can be exported as a PDF and/or Markdown report.

The Installation Validator is installed together with the OSP Suite core components and requires an installation of PK-Sim®. It is also available separately from the [Installation Validator releases page](https://github.com/Open-Systems-Pharmacology/InstallationValidator/releases).

### (Re-)Qualification Framework

Optional OSP Suite components which are only required for the [creation of qualification reports](../part-5/qualification.md).

Installation instructions are provided in [Tools](../part-5/qualification.md#tools).

### Third Party Tools

In addition to the core components of the Open Systems Pharmacology Suite, including PK-Sim® and MoBi®, interfaces are available for MS Excel® and R. For purchasing and installation options, please contact the respective suppliers, see [Trademark Information](#trademark-information).

## Help: Contact, Discussion Forum, Bug Reporting, ...

Additional information on the software is available on [http://www.open-systems-pharmacology.org/](http://www.open-systems-pharmacology.org/).

For support, bug reports, etc., please contact [http://forum.open-systems-pharmacology.org/](http://forum.open-systems-pharmacology.org/).
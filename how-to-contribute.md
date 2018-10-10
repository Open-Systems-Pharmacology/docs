# Open Systems Parmacology - Documentation contributor guide overview

Welcome to the [docs.open-systems-pharmacology.org](http://docs.open-systems-pharmacology.org) Contributor guide!

The documentation for the Open Systems Pharmacology Suite is open source and hosted on GitHub. Despite all the efforts to maintain and update the documentation, there will always be small grammar and spelling errors sliding through the cracks as well as sections of the documentation that are not clear enough, missing or outdated.

While you can create issues in the [docs repository](https://github.com/Open-Systems-Pharmacology/docs/issues) to report those errors or omissions, it will often be faster and easier to submit your edits directly to be reviewed by the documentation core team.

This guide aims at describing the workflow to contribute to the documentation.

## Requirements

The only requirement to contribute to the documentation is to have a GitHub account. If you do not have an account, you can [create one](https://github.com/join) for free in a few seconds.

## Edit of existing documents

Each page available on the docs website corresponds to a file hosted on GitHub that can be edited.

Clicking on the `Edit on GitHub` button will take you to the source file on GitHub.![Edit on GitHub](/assets/images/edit-github.png)

Next, click the pencil icon, as shown in the following figure to edit the article.![Edit](/assets/images/editicon.png)

{% hint style="note" %}
If the pencil icon is grayed out, you need to login to your GitHub account.
{% endhint %}

{% hint style="note" %}
Make your changes in the web editor. Formatting of the documentation is based on the so called **Markdown** syntax. 
The description of this lightweight and easy-to-use syntax can be found [here](https://guides.github.com/features/mastering-markdown/).
You can click the Preview changes tab to check formatting of your change.
{% endhint %}

Once you are done with your changes, scroll to the bottom of the page. Enter a title and description for your edits and click `Propose file change` as shown in the following figure:

![Propose file change](/assets/images/submit-pull-request.png)

Now that you have proposed your changes, you need to ask the documentation core team to incorporate them into the documentation.
This is done using something called a **pull request**. When you clicked on `Propose file change` in the figure above, click on `Create pull request` button. Now you should have been taken to a new page that looks like the following figure:

![Open pull request](/assets/images/open-pull-request.png)

Review the title and the description for the pull request, and then click `Create pull request`.

That's it! The documentation core team will be notified and review your changes. You may get some feedback requesting changes if you made larger changes.

## Adding new content

The process is slightly more complicated as you need to create a new content file and incorporate it into the existing documentation. We would be happy to help you do that if you need some support. Simply open an issue in the docs repo describing what you want to add and where and we'll get in touch with you.

## Rich content

### Note, hints and callout

Provides a great way to bring the reader's attention to specific elements. 

By surrounding your text with `{\% hint style="xxx" %}` and `{% endhint %}`, a visual clue will be created for your content, making it pop out

For example: using the style `note`, we can create the following visual element

{% hint style="note" %}
This is a note
{% endhint %}

Available styles are:
 * tip
 * note
 * warning
 * info




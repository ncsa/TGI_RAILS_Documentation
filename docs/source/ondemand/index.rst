.. _ood:

Open OnDemand
=============

Open OnDemand provides a way to access and interact with TGI Rails resouces in a browser. 
OnDemand's Web interface provides a way to view, edit, download, and upload files, submit, manage 
and monitor jobs, and use interactive applications such as JupyterLab, without neededing a SSH 
terminal connection. 


Connecting
---------------

The Rails OnDemand interface can be accessed by navigating in a web browser to 
https://railsondemand.ncsa.illinois.edu. Upon successful login, you will be redirected to OnDemand dashboard. On the dashboard you can announcements and our message of the day. Along the top are tabs for the different features of OnDemand.

.. image:: images/dashboard.png
    :alt: OnDemand dashboard page
    :align: center

Managing files
----------------
To manage files on RAILS, click on **Files > Home Directory** dropdown in the navigation bar, this will bring up a file browser. You can view, edit and delete files from this interface as well as upload and download files to and from your local machine.

.. Warning::
    For large file transfers or transfers with many files, please use :ref:`Globus <globus>`_. File transfers through the OOD interface are limited to the amount of memory on the OnDemand server, the number of users currently using it, and browser limitations.

Shell Access
-----------------
OnDemand provides a terminal interface that allows you to connect to RAILS just like you would with SSH. You can access the shell by clicking **Clusters > TGI RAILS Shell Access** from the navigation bar.


Job Management
--------------
You can create or edit job scripts, submit jobs, and monitor job status from the **Jobs** interface. In the navigation bar 

Interactive apps
----------------

One of the most powerful features of Open OnDemand is the ability to run interactive GUI based applications directly in your browser. See the individual application pages for more details on usage. On RAILS the available interactive apps include:
    
.. toctree::
    :maxdepth: 1

    jupyterLab
    matlab
    tensorboard
    vscode

.. _ood-jupyter-notebook:

**Jupyter Notebook**
    Jupyter notebooks are a powerful tool for data analysis and visualization. To start a Jupyter notebook, click on **Interactive Apps > Jupyter Notebook** in the navigation bar. You can then select the resources you need and start the notebook server.

.. toctree::
    :maxdepth: 1

    jupyterLab

.. _ood-vscode:

**Vscode**
    Visual Studio Code is a powerful code editor that can be run directly in your browser. To start Vscode, click on **Interactive Apps > Vscode** in the navigation bar. You can then select the resources you need and start the Vscode server.

.. toctree::
    :maxdepth: 1

    vscode

.. _ood-tensorboard:

**Tensorboard**
    Tensorboard is a tool for visualizing and monitoring the training of machine learning models. To start Tensorboard, click on **Interactive Apps > Tensorboard** in the navigation bar. You can then select the resources you need and start the Tensorboard server.

.. toctree::
    :maxdepth: 1

    tensorboard

**M
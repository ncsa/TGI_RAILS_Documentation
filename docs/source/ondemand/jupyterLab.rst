.. _ood-jupyterlab:

JupyterLab
============

Jupyter notebooks are a powerful tool for data analysis and visualization. The Open OnDemand 
dashboard provides an easy way to launch a JupyterLab environment on RAILS. To start a Jupyter 
notebook, click on **Interactive Apps > Jupyter Notebook** in the navigation bar. You can then 
select the resources you need and start the notebook server.

How to Start an OOD JupyterLab Session
-----------------------------------------

#. Navigate to the `Open OnDemand dashboard <https://railsondemand.ncsa.illinois.edu/>`_.
#. Open the **Interactive Apps** menu at the top of the window and click **Jupyter Lab**.
#. Fill out the form and then click **Launch**.

   - **Kernal Module** - Select the default kernel you want to use for your JupyterLab session. This can be changed from within jupyterlab as well.
   - **Name of account** - This must match one of your available RAILS accounts; these are listed under ``Project`` when you run the ``accounts`` command on RAILS.
   - **Name of reservation** - Leave empty if none.
   - **Partition** - Select which partition you want to use for the session. (CPU or GPU)
   - **Number of CPUs** - Select the number of CPUs you want for the session.
   - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
   - **Number of GPUs** - Select the number of GPUs you want for the session. Note, you must select the GPU partition to use GPUs.
   - **Duration of job** - Select your duration following the format example in the form. Note the duration limit for interactive partitions.
   - **Additional Modules** - Add any additional lmod modules you need for your session.
   - **Workspace** - Sets the default directory to start the interactive app in.

   \

#. After you click **Launch**, you will be taken to **My Interactive Sessions** where you can view the status of your session.

   .. figure:: images/jupyterLab-queued.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Jupyter Lab session status: "Your session is currently starting...Please be patient as this process can take a few minutes."
      :width: 500

#. Once your session has started, click **Connect to Jupyter** to launch your JupyterLab environment. Note, this can take up to few minutes depending on availability.

   .. figure:: images/jupyterLab-running.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Jupyter Lab session with the Connect to Jupyter button.
      :width: 500

#. You are now in your JupyterLab environment on RAILS. 

   .. figure:: images/jupyterLab-home.png
      :alt: Open OnDemand Jupyter Lab session showing the Jupyter Lab interface.
      :width: 500

#. You can view the time remaining on your interactive sessions by clicking **My Interactive Sessions** from the Open OnDemand dashboard.

   .. figure:: images/ood-interactive-sessions-button.png
      :alt: Open OnDemand options at top of window with the My Interactive Sessions button highlighted.
      :width: 750

Jupyter Environments
----------------------

In OnDemand, Jupyter and JupyterLab will find the environments in your ``$HOME/.conda/envs``, your login shell should reflect what you want to see from Jupyter.

The available `conda-based environment kernels for Jupyter <https://github.com/Anaconda-Platform/nb_conda_kernels>`_ should be the same as what you see from a login shell and python3.

**Jupyter needs to be installed in every virtual environment where you want to use JupyterLab or Jupyter Notebook.**

  .. code-block:: terminal

     $ conda install jupyter

You can also :ref:`customize OOD JupyterLab with Anaconda environments <ood-custom-anaconda>`.

To see the possible Jupyter kernels for your current environment or module setup, run one of the following in a RAILS terminal (:ref:`Open OnDemand shell <ood-shell-interface>` or :ref:`direct SSH <direct_access>`):

  - .. code-block:: terminal

       python3 -m nb_python_kernels list

  - .. code-block:: terminal

       jupyter-kernelspec list


.. _ood-tensorboard:

TensorBoard
=============

Launch TensorBoard, TensorFlow's visualization toolkit, from the Open OnDemand dashboard.

How to Start an OOD TensorBoard Session
------------------------------------------

#. Navigate to the `Open OnDemand dashboard <https://railsondemand.ncsa.illinois.edu/>`_.
#. Open the **Interactive Apps** menu at the top of the window and click **TensorBoard**.
#. Fill out the form and then click **Launch**.

   - **Tensorboard logdir** - The directory of the TensorBoard logs that you want to display.
   - **Addtional Tensorboard arguments** - Arguments that will be passed to tensorboard server on command line when launched.
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

   .. figure:: images/tensorboard-queued.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Code Server session status: "Your session is currently starting...Please be patient as this process can take a few minutes."
      :width: 500

#. Once your session has started, click **Connect to TensorBoard** to launch your TensorBoard environment. Note, this can take up to a few minutes depending on availability.

   .. figure:: images/tensorboard-running.png
      :alt: Open OnDemand My Interactive Sessions screen showing the TensorBoard session with the Connect to TensorBoard button.
      :width: 500

#. You are now in your TensorBoard environment. 

   .. figure:: images/tensorboard-home.png
      :alt: Open OnDemand TensorBoard session showing the TensorBoard interface.
      :width: 500

#. You can view the time remaining on your interactive sessions by clicking  **My Interactive Sessions** in the Open OnDemand dashboard.

   .. figure:: images/ood-interactive-sessions-button.png
      :alt: Open OnDemand options at top of window with the My Interactive Sessions button highlighted.
      :width: 750

|

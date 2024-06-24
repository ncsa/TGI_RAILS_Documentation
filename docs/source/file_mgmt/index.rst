Data Management
================

**File Systems**
----------------

Storage on TGI RAILS is split into three types of spaces:

- A user specific home directory, $HOME, located at /u/$USER. One per user with no option
  for sharing data with other users.
- Project shared space located at /projects/WXYZ. By default all project group members share 
  access (and quota) in this space.
- Job specific scratch space located on each node.

For example, a user (with username auser) who has an allocated project
with a local project serial code **abcd** (a three or four character code) will see the following entries
in their ``$HOME`` and entries in the project and scratch file systems.
To determine the project code please use the ``accounts`` command.

Directory access changes can be made using the
`facl <https://linux.die.net/man/1/setfacl>`_ command. Contact
help@ncsa.illinois.edu if you need assistance with enabling access to
specific users and projects.

::

   $ ls -ld /u/$USER
   drwxrwx---+ 12 root root 12345 Feb 21 11:54 /u/$USER

   $ ls -ld /projects/abcd
   drwxrws---+  45 root   tgirails_abcd      4096 Feb 21 11:54 /projects/abcd

   $ ls -l /projects/abcd
   total 0
   drwxrws---+ 2 auser tgirails_abcd 6 Feb 21 11:54 auser
   drwxrws---+ 2 buser tgirails_abcd 6 Feb 21 11:54 buser
   ...

   $ ls -ld /scratch/abcd
   drwxrws---+  45 root   tgirails_abcd      4096 Feb 21 11:54 /scratch/abcd

   $ ls -l /scratch/abcd
   total 0
   drwxrws---+ 2 auser tgirails_abcd 6 Feb 21 11:54 auser
   drwxrws---+ 2 buser tgirails_abcd 6 Feb 21 11:54 buser
   ...

To avoid issues when file systems become unstable or non-responsive, we
recommend not putting symbolic links from $HOME to the project and
scratch spaces.

| 

/tmp on compute nodes (job duration)

The high performance ssd storage (740GB cpu, 1.5TB gpu) is available in
/tmp (*unique to each node and job–not a shared filesystem*) and may
contain less than the expected free space if the node(s) are running
multiple jobs. Codes that need to perform i/o to many small files should
target /tmp on each node of the job and save results to other
filesystems before the job ends.

Transferring Data
--------------------
To transfer files to and from the TGI RAILS system :

GUI apps need to support DUO 2-factor authentication

Many GUI applications that support ssh/scp/sftp will work with DUO. A
good first step is to use the interactive (not stored/saved) password
option with those apps. The interactive login should present you with
the 1st password prompt (your kerberos password) followed by the 2nd
password prompt for DUO (push to device or passcode from DUO app).

| 

-  scp - to be used for small to modest transfers to avoid impacting the
   usability of the RAILS login node (*rails.ncsa.illinois.edu*).

-  rsync - to be used for small to modest transfers to avoid impacting
   the usability of the RAILS login node.

   -  https://campuscluster.illinois.edu/resources/docs/storage-and-data-guide/
      (scp, sftp, rsync)

-  Globus - to be used for large data transfers including transfering data between file systems.

   If transfering from your own system install Globus Connect Personal (minimum version is 3.2.0)

   -  Use the TGI RAILS collection "**TGI RAILS**".
   -  Please see the following documentation on using Globus

      -  https://docs.globus.org/how-to/get-started/

.. _transferring-files:

Accessing and Transferring Files 
=================================

.. _small-transfer-tools:

Transferring a Few Small Files
-------------------------------------------------

These tools are suitable for a few (typically less than 1000) files and in total less than 100 GB.  If your transfers using these tools take more than 15 minutes, please consider using Globus instead.  

If you use a Windows machine, you can transfer files back and forth between your machine and TGI RAILS using an application called "WinSCP".  You'll have to download it and install it.  When you open WinSCP, you'll need to log into the TGI RAILS login node as your "remote" node, using your username, password, and 2FA as usual.  Once you've logged in, WinSCP will work like a drag and drop interface for moving files.  

The program Secure CoPy (SCP) can be used to securely transfer files between TGI RAILS and other systems.  SCP is built into all Mac and most Windows computers.  You can find tutorials online for using SCP.  The important thing you need to know is the full pathname of the file(s) that you're wanting to move on the machine where they're coming from, *and* the full pathname of where you want the files to go.

As an example, you want to move a file called "my_input_file.dat" from your local computer to TGI RAILS.  You want to put it in a directory on TGI RAILS which is "/u/auser/input_files".  First, open a terminal or command prompt.  Change directories to where the file is, so that if you run the "ls" command, the file you want to transfer is listed.  

:: 

   $ cd outgoing_data
   $ ls
   my_input_file.dat
   
Now securely copy the file to Hydro using the following command: 

:: 

   scp ./my_input_file.dat auser@rails.ncsa.illinois.edu:/u/auser/input_files/

The output will prompt you for your kerberos password, ask you to initiate a 2FA confirmation (or else ask for a passcode).  If you authentication is successful, it will transfer the file, printing out progress as it does so.


.. _globus:

Transferring Many or Large Files With Globus
---------------------------------------------

Globus is a web-based file transfer system that works in the background to move files between systems with "Globus Endpoints".  TGI RAILS's Globus endpoint is called "TGI RAILS".  To transfer files to and from your directories using Globus, you will have to authenticate that endpoint, using your  NCSA username, password, and NCSA account on Duo. 

One-time Setup
~~~~~~~~~~~~~~~~

You will need to set up a separate account on globus.org, that will have a username and a separate password.  To use Globus to transfer files to and from TGI RAILS, if you haven't already, you will need to "link" your new Globus account with your NCSA identity.  Log into globus.org, click on "Account" in the left sidebar, then click on the "Identities" tab.  If your NCSA username and email address is not in that list, then click "Link Another Identity" in the upper right to link it.


Sharing Files with Collaborators
--------------------------------


Access Controls
----------------

Quotas and Policies
---------------------
/u/$HOME (unshared space, 5TB default quota)

/projects/WXYZ (project shared space, 50TB default quota)

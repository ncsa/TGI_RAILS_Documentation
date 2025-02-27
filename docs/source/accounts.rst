.. _accounts:

Allocation and Account Administration
========================

Who is eligible to use TGI RAILS?
----------------------------------
Geospatial related researchers, faculty, and staff at each of the TGI member organizations are 
eligible to use RAILS for geospatial-related research. The system can also be used in courses of 
any discipline. Additionally up to 20% of RAILS capability is accessible via the `Open Science 
Grid. https://osg-htc.org/`_.

How to get started on RAILS?
-----------------------------
Getting started on RAILS is easy, simply follow these steps. For assistance, contact your local 
institution's TGI support team or send questions to help@ncsa.illinois.edu

 1. Complete the `TGI Data Services Request <https://arcg.is/01DLDX0>`_ form on the TGI website, 
 select “Data Processing or Analytics” under “What service do you need?” and answer the subsequent 
 questions regarding the specifics of your request.

 2. Once your request has been processed, you will receive an email from DataServices@taylorgeospatial.org
   with instructions on how to create an NCSA account and submit a proposal for a project on the TGI RAILS system.

 3. Once your project has been approved, you will be able to submit jobs on the RAILS system.
Access TGI RAILS. Upload data, run scripts, visualize data, and more



Requesting an Allocation
-------------------

**Faculty and staff at TGI institutions** are eligible to request allocations on the TGI RAILS system.

To apply, completion of a `data service request <https://arcg.is/01DLDX0>`_ is the first step. 

Once approved, you can continue to submit a proposal for a project on the system, and for that, the PI 
must have an NCSA account. 

If you do not have an NCSA account please use this 
`link <https://identity.ncsa.illinois.edu/join/JULMUHKSBU>`_ to request an account. 

Once your NCSA 
is setup you can submit a proposal using the `NCSA XRAS interface. 
<https://xras-submit.ncsa.illinois.edu/opportunities/532814/requests/new>`_ The proposal will need 
to include a title, a short abstract suitable for posting on public web sites, the TGI institution, 
a statement of the project goals and an estimate of allocation needed. 

After submission the proposal will be reviewed by a reviewer designated by TGI and once approved, the project will be created in 
the NCSA management systems and on TGI RAILS. Please note that these last two steps do involve some 
manual steps which can take up to five business days to complete (depending on staff availability).

Managing Users
----------------
PIs may add and remove users to their allocation using the `NCSA group management interface
<https://internal.ncsa.illinois.edu/mis/groups/>`_. PIs can delegate the ability to manage users to other project members once those accounts are added to the project. Please refer to `this page 
<https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management#NCSAAllocationandAccountManagement-GroupManagement>`_ 
for additional documentation on the group management interface.

Please see this `page <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ for links to NCSA
Identity and NCSA Duo services. 

Account and Group
-------------------
Each user of TGI RAILS must obtain an NCSA account and Duo software token. To get an account a PI
(or allocation manager) must add you to their project via the instructions in the previous section.
Each RAILS user will be a member of at least one allocated project which will map
to a group on the RAILS system. Note that your account will automatically be removed from the system
when your project expires. Make sure you transfer any data you need off the system before the account is removed!

Management Tools
-----------------
You can manage your NCSA identity (change email, password, Duo device, etc) and project PIs
and allocation managers can add or remove accounts to their project with the
`NCSA Identity and NCSA group management tools <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_.

**Configuring Your Account**
----------------------------

-  Bash is the default shell, submit a support request to change your
   default shell
-  Environment variables: SLURM batch
-  Using :ref:`module`

**Allocation Policies**
-----------------------

-  TGI awarded projects and allocations currently do not receive
   periodic messages regarding approaching project expiration.

-  Projects will no longer be able to run jobs after their project expires or their
   allocation is exhausted.

-  There is a 0-day grace-period for expired RAILS projects to allow
   for data management access only.
   
-  Following the grace period expired projects will be removed from the system and project data removed.
   
-  Any accounts no longer on an active project are removed from the system and their
   home directory data removed.

Allocation Supplements and Extensions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Requests for resource allocation supplements (compute, GPU, or
storage)and extensions can be made via the appropriate XRAS website.

-  TGI allocation PIs can find instructions for requesting supplements
   and extensions at the bottom of the `Delta Allocations
   page. <https://wiki.ncsa.illinois.edu/display/USSPPRT/Delta+Allocations#DeltaAllocations-Requestingan%22Extension%22or%22Supplement%22foranexistingDeltaallocation>`__ While that page documents the process for Delta projects, the process is the same for TGI RAILS projects.

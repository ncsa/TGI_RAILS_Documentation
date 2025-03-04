Installed Software
======================

TGI RAILS software is provisioned, when possible, using spack to produce
modules for use via the lmod based module system. Select NVIDIA NGC
containers are made available (see the container section below) and are
periodically updated from the NVIDIA NGC site. An automated list of
available software can be found on the ACCESS website.

.. _module:

modules/lmod
-----------------

TGI RAILS provides two sets of modules and a variety of compilers in each
set. The default environment is **modtree/gpu** which loads a recent
version of gnu compilers , the openmpi implementation of MPI, and cuda.
The environment with gpu support will build binaries that run on both
the gpu nodes (with cuda) and cpu nodes (potentially with warning
messages because those nodes lack cuda drivers). For situations where
the same version of software is to be deployed on both gpu and cpu nodes
but with separate builds, the **modtree/cpu** environment provides the
same default compiler and MPI but without cuda. Use module spider
package_name to search for software in lmod and see the steps to load it
for your environment.

.. table:: Module (Lmod) Commands

   +----------------------------------+--------------------------------------------------------------------------------------+
   | Module (Lmod) Command            | Example                                                                              |
   +==================================+======================================================================================+
   |                                  |                                                                                      |
   | .. code-block:: terminal         |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   |    module list                   |      $ module list                                                                   |
   |                                  |                                                                                      |
   | Display the currently loaded     |      Currently Loaded Modules:                                                       |
   | modules.                         |      1) gcc/11.2.0   3) openmpi/4.1.2                                                |
   |                                  |      2) ucx/1.11.2   4) cuda/11.6.1                                                  |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   +----------------------------------+--------------------------------------------------------------------------------------+
   | .. code-block:: terminal         |                                                                                      |
   |                                  |                                                                                      |
   |    module load <package_name>    |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   | Loads a package or metamodule    |      $ module load                                                                   |
   | such as netcdf-c.                |                                                                                      |
   |                                  |      Due to MODULEPATH changes, the following have been reloaded:                    |
   |                                  |      1) gcc/11.2.0     2) openmpi/4.1.2     3) ucx/1.11.2                            |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   +----------------------------------+--------------------------------------------------------------------------------------+
   | .. code-block:: terminal         |                                                                                      |
   |                                  |                                                                                      |
   |    module spider <package_name>  |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   | Finds modules and displays the   |      $ module spider openblas                                                        |
   | ways to load them.               |                                                                                      |
   |                                  |      ---------------------------------------------------------------------------     |
   | |                                |      openblas: openblas/0.3.20                                                       |
   |                                  |      ----------------------------------------------------------------------------    |
   | .. code-block:: terminal         |      You will need to load all module(s) on any one of the lines below before the    |
   |                                  |      "openblas/0.3.20" module is available to load.                                  |
   |    module -r spider "regular     |                                                                                      |
   |    expression"                   |            aocc/3.2.0                                                                |
   |                                  |            gcc/11.2.0                                                                |
   |                                  |                                                                                      |
   |                                  |         Help:                                                                        |
   |                                  |           OpenBLAS: An optimized BLAS library                                        |
   |                                  |                                                                                      |
   |                                  |      $ module -r spider "^r$"                                                        |
   |                                  |                                                                                      |
   |                                  |      ----------------------------------------------------------------------------    |
   |                                  |        r:                                                                            |
   |                                  |      ----------------------------------------------------------------------------    |
   |                                  |          Versions:                                                                   |
   |                                  |             r/4.1.3                                                                  |
   |                                  |      ...                                                                             |
   |                                  |                                                                                      |
   +----------------------------------+--------------------------------------------------------------------------------------+

see also: `User Guide for
Lmod <https://lmod.readthedocs.io/en/latest/010_user.html>`__

Please open a service request ticket by sending email to
help+tgi@ncsa.illinois.edu for help with software not currently installed on
the TGI RAILS system. For single user or single project use cases the
preference is for the user to use the spack software package manager to
install software locally against the system spack installation as
documented <here>. TGI RAILS support staff are available to provide limited
assistance. For general installation requests the TGI RAILS project office
will review requests for broad use and installation effort.

Python
--------

.. toctree::

   python/index
   python_env/index

R
---

.. toctree::

   R/index

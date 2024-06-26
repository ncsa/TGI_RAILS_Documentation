Programming Environment (Building Software)
===============================================

The RAILS programming environment supports the GNU, Intel
and NVIDIA HPC compilers.

Modules provide access to the compiler + MPI environment.

The default environment includes the GCC compiler + OpenMPI with
support for cuda and gdrcopy. nvcc is in the cuda module and is loaded
by default.

Recommended compiler flags for GNU and Intel compilers for
Sapphire Rapids processors include "-march=sapphirerapids -mtune=sapphirerapids"
when using GCC and "-xsapphirerapids" with the Intel compiler. Both are recommended
to optimize at the -O3 or -Ofast level.


Modules
-------------------------

The user environment is controlled using the modules environment management system. 
Modules may be loaded, unloaded, or swapped either on a command line or in your **$HOME/.bashrc** (**.cshrc** for csh ) shell startup file.

The ``module`` command is a user interface to the Lmod package. 
The `Lmod package <https://lmod.readthedocs.io/en/latest/010_user.html>`_ provides for the dynamic modification of the user’s environment via **modulefiles** (a modulefile contains the information needed to configure the shell for an application). 
Modules are independent of the user’s shell, so both **tcsh** and **bash** users can use the same commands to change the environment.

.. table:: Useful Module Commands

   =========================================== ==========================
   Command                                     Description                      
   =========================================== ==========================
   ``module avail``                            lists all available modules      
   ``module list``                             lists currently loaded modules
   ``module avail | more``		           display the available modules on the system one page at a time
   ``module spider foo``                       search for modules named **foo**     
   ``module help modulefile``                  help on module **modulefile**        
   ``module display modulefile``               display information about **modulefile**      
   ``module load modulefile``                  load **modulefile** into current shell environment     
   ``module unload modulefile``                remove **modulefile** from current shell environment  
   ``module swap modulefile1 modulefile2``     unload **modulefile1** and load **modulefile2**  
   =========================================== ==========================

**To include a particular software stack in your default environment for TGI RAILS login and compute nodes:**

  #. Log into a TGI RAILS login node. 
  #. Manipulate your modulefile stack until satisfied. 
  #. Run ``module save``; this will create a **.lmod.d/default** file that will be loaded on the TGI RAILS login or compute nodes on your next login or job execution.

.. table:: Useful User Defined Module Collections

   ==================================== =======================
   Command                              Description                      
   ==================================== =======================
   ``module save``                      save current modulefile stack to **~/.lmod.d/default** 
   ``module save collection_name``      save current modulefile stack to **~/.lmod.d/collection_name**
   ``module restore``                   load **~/.lmod.d/default** if it exists or System default    
   ``module restore collection_name``   load your **~/.lmod.d/collection_name**                       
   ``module reset``                     reset your modulefiles to System default 
   ``module disable collection_name``   disable **collection_name** by adding **collection_name~**      
   ``module savelist``                  list all your **~/.lmod.d/collections**                   
   ``module describe collection_name``  list **collection_name modulefiles** 
   ==================================== =======================


Compiling
-------------------------

Serial Programs
----------

To build (compile and link) a serial program in Fortran, C, and C++:

=================== ================= ====================
GNU                 Intel             NVIDIA
gfortran *myprog*.f ifort *myprog*.f  nvfortran *myprog*.f
gcc *myprog*.c      icc *myprog*.c    nvc *myprog*.c
g++ *myprog*.cc     icpc *myprog*.cc  nvc++ *myprog*.cc
=================== ================= ====================

MPI Programs
-------------------------
To build (compile and link) an MPI program, use the ``mpicc``, ``mpiCC``, ``mpif77`` or ``mpif90`` compiler wrappers to automatically include the OpenMPI libraries.

For example:

.. code-block::

   mpicc -o mpi_hello mpi_hello.c


Python
-------------------------

If you want a basic, recent Python setup, use the ``python`` installation under the ``gcc`` module. You can add modules via ``pip3 install --user <modulename>``, setup virtual environments, and customize as needed for your workflow, but starting from an installed base of Python smaller than Anaconda.

.. code-block::

   $ module load gcc python
   $ which python
   /sw/spack/v1/apps/python/3.11.6-gcc-11.4.0-apaxxj5/bin/python
   $ module list

   Currently Loaded Modules:
     1) scripts/script_paths   3) StdEnv       5) cuda/11.8.0     7) python/3.11.6
     2) user/license_file      4) gcc/11.4.0   6) openmpi/4.1.6

View the python packages installed in this environment using ``pip3 list``


OpenMP Programs
-------------------------

To build an OpenMP program, use the -fopenmp /-mp option:

+----------------------+----------------------+----------------------+
| GNU                  | Intel                | NVIDIA               |
+----------------------+----------------------+----------------------+
| gfortran -fopenmp    | ifort -fopenmp       | nvfortran -mp        |
| *myprog*.f           | *myprog*.f           | *myprog*.f           |
| gcc -fopenmp         | icc -fopenmp         | nvc -mp *myprog*.c   |
| *myprog*.c           | *myprog*.c           | nvc++ -mp            |
| g++ -fopenmp         | icpc -fopenmp        | *myprog*.cc          |
| *myprog*.cc          | *myprog*.cc          |                      |
+----------------------+----------------------+----------------------+

Hybrid MPI/OpenMP Programs
-------------------

To build an MPI/OpenMP hybrid program, use the -fopenmp / -mp option
with the MPI compiling commands:

============================ =======================
GNU                            NVIDIA 
mpif77 -fopenmp *myprog*.f     mpif77 -mp *myprog*.f
mpif90 -fopenmp *myprog*.f90   mpif90 -mp *myprog*.f90
mpicc -fopenmp *myprog*.c      mpicc -mp *myprog*.c
mpic++ -fopenmp *myprog*.cc    mpic++ -mp *myprog*.cc
============================ =======================


OpenACC Programs
-------------------------

To build an OpenACC program, use the -acc option and the -mp option for
multi-threaded, under the NVIDIA compilers:

========================= =============================
NON-MULTITHREADED           MULTITHREADED
nvfortran -acc *myprog*.f   nvfortran -acc -mp *myprog*.f
nvc -acc *myprog*.c         nvc -acc -mp *myprog*.c
nvc++ -acc *myprog*.cc      nvc++ -acc -mp *myprog*.cc
========================= =============================

CUDA
-------------------------

The cuda compiler (nvcc) is included in the cuda module, which is loaded by
default. For access to the cuda fortran compiler, cuda c++ compiler and other
Nvidia development tools, load the "nvhpc" module.

::

  [cmendes@railsl1 /]$ nv
  nv-fabricmanager         nvcpuid                  nvidia-debugdump         nvlink
  nv-hostengine            nvcudainit               nvidia-modprobe          nvprepro
  nv-nsight-cu             nvdecode                 nvidia-persistenced      nvprof
  nv-nsight-cu-cli         nvdisasm                 nvidia-powerd            nvprune
  nvaccelerror             nvextract                nvidia-settings          nvsize
  nvaccelinfo              nvfortran                nvidia-sleep.sh          nvswitch-audit
  nvc                      nvidia-bug-report.sh     nvidia-smi               nvunzip
  nvc++                    nvidia-cuda-mps-control  nvidia-xconfig           nvvp
  nvcc                     nvidia-cuda-mps-server   nvjtag_discovery         nvzip

See also: https://developer.nvidia.com/hpc-sdk

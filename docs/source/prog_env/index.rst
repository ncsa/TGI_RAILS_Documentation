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
To build (compile and link) a MPI program in Fortran, C, and C++:

+----------------------+----------------------+----------------------+
| MPI Implementation   | modulefiles for      | Build Commands       |
|                      | MPI/Compiler         |                      |
+----------------------+----------------------+----------------------+
| |                    | ::                   | |                    |
|                      |                      |                      |
| | OpenMPI            |                      | +-------+-------+    |
| | (`Home             |                      | | Fo    | m     |    |
|   Page <http://w     |                      | | rtran | pif77 |    |
| ww.open-mpi.org/>`__ |                      | | 77:   | *mypr |    |
|   /                  |                      | |       | og*.f |    |
|   `Document          |   gcc/11.2.0 openmpi | +-------+-------+    |
| ation <http://www.op |                      | | Fo    | m     |    |
| en-mpi.org/doc/>`__) |                      | | rtran | pif90 |    |
|                      |                      | | 90:   | *m    |    |
|                      |   nvhpc/22.2 openmpi | |       | yprog |    |
|                      |                      | |       | *.f90 |    |
|                      |                      | +-------+-------+    |
|                      |    intel-oneapi      | | C:    | mpicc |    |
|                      | -compilers/2022.0.2  | |       | *mypr |    |
|                      |    openmpi           | |       | og*.c |    |
|                      |                      | +-------+-------+    |
|                      |                      | | C++:  | m     |    |
|                      |                      | |       | pic++ |    |
|                      |                      | |       | *     |    |
|                      |                      | |       | mypro |    |
|                      |                      | |       | g*.cc |    |
|                      |                      | +-------+-------+    |
|                      |                      |                      |
|                      |                      | |                    |
+----------------------+----------------------+----------------------+

Python
-------------------------

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

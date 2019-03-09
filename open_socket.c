#include <stdio.h>

void main() {
  int fd1, sd1;
  fd1 = open(“/etc/passwd”, O_RDONLY, 0);
  sd1 = socket(AF_INET, SOCK_STREAM, 0);
  printf(“File Descriptor %d\n”, fd1);
  printf(“Socket Descriptor %d\n”, sd1);
  close(fd1);
  close(sd1);
}

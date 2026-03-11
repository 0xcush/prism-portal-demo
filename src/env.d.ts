/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      email: string;
      name: string;
      role: string;
      portal: string;
      entities: string[];
    };
    token?: string;
  }
}

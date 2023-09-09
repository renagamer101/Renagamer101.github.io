{ pkgs }: {
  deps = [
    pkgs.systemdMinimal
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}
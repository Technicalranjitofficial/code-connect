export const mapBoilerplateCodeToLanguage = (
  language: string,
  functionSignature: string,
  executionFunction: string
) => {
  switch (language) {
    case "c++":
      return `#include <iostream>;
using namespace std;

${functionSignature}

int main() {

int t;
cin>>t;
while(t--){

    ${executionFunction}
    }

    
    return 0;
}

    `;

    case "c":
      return `#include <stdio.h>
      #include <string.h>

${functionSignature}

int main() {
  int t;
    scanf("%d",&t);
while(t--){

    ${executionFunction}
    }

    
    return 0;
}
    `;
  }
};

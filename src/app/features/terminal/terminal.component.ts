import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CommandOutput {
  command: string;
  output: string;
  isError?: boolean;
}

@Component({
  selector: 'app-terminal',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="terminal-container mono" (click)="focusInput()">
      <div class="terminal-header">
        <span class="terminal-title text-green">ibrahim@devops-os:~$</span>
        <span class="terminal-hint text-secondary">Type 'help' for available commands</span>
      </div>

      <div class="terminal-output" #outputContainer>
        <!-- Welcome Message -->
        <div class="output-line text-green">
          <pre>Welcome to DevOps OS Terminal v2024.12
Last login: {{ getCurrentTime() }}
Type 'help' to see available commands.</pre>
        </div>

        <!-- Command History Output -->
        @for (item of history(); track $index) {
          <div class="command-block">
            <div class="command-input-line">
              <span class="prompt text-blue">ibrahim@devops-os:~$</span>
              <span class="command-text">{{ item.command }}</span>
            </div>
            <div class="command-output" [class.error]="item.isError">
              <pre>{{ item.output }}</pre>
            </div>
          </div>
        }

        <!-- Current Input Line -->
        <div class="input-line">
          <span class="prompt text-blue">ibrahim@devops-os:~$</span>
          <input 
            #commandInput
            type="text"
            [(ngModel)]="currentCommand"
            (keydown.enter)="executeCommand()"
            (keydown.ArrowUp)="navigateHistory(1)"
            (keydown.ArrowDown)="navigateHistory(-1)"
            (keydown.Tab)="autocomplete($event)"
            class="terminal-input"
            [autofocus]="true"
            spellcheck="false" />
          <span class="cursor" [class.blink]="!currentCommand()">▋</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terminal-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
      color: var(--text-mono);
      cursor: text;
    }

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) var(--space-4);
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-primary);
    }

    .terminal-title {
      font-weight: var(--font-weight-bold);
    }

    .terminal-hint {
      font-size: var(--font-size-xs);
    }

    .terminal-output {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-4);
      line-height: var(--line-height-relaxed);
    }

    .output-line {
      margin-bottom: var(--space-4);
    }

    .output-line pre,
    .command-output pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: inherit;
    }

    .command-block {
      margin-bottom: var(--space-3);
    }

    .command-input-line {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-1);
    }

    .prompt {
      flex-shrink: 0;
    }

    .command-text {
      color: var(--text-primary);
    }

    .command-output {
      padding-left: calc(var(--space-2) * 10);
      color: var(--accent-green);
    }

    .command-output.error {
      color: var(--accent-red);
    }

    .input-line {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .terminal-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-primary);
      font-family: var(--font-mono);
      font-size: var(--font-size-base);
      caret-color: transparent;
    }

    .cursor {
      color: var(--accent-green);
      opacity: 1;
    }

    .cursor.blink {
      animation: cursor-blink 1060ms step-end infinite;
    }

    @media (max-width: 768px) {
      .terminal-hint {
        display: none;
      }
    }
  `]
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('commandInput') commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('outputContainer') outputContainer!: ElementRef<HTMLDivElement>;

  currentCommand = signal('');
  history = signal<CommandOutput[]>([]);
  commandHistory: string[] = [];
  historyIndex = -1;

  ngAfterViewInit(): void {
    this.focusInput();
  }

  getCurrentTime(): string {
    return new Date().toLocaleString();
  }

  focusInput(): void {
    this.commandInput?.nativeElement?.focus();
  }

  executeCommand(): void {
    const cmd = this.currentCommand().trim();
    if (!cmd) return;

    // Add to command history
    this.commandHistory.unshift(cmd);
    this.historyIndex = -1;

    // Execute and get output
    const output = this.processCommand(cmd);
    
    // Add to display history
    this.history.update(h => [...h, { command: cmd, output: output.text, isError: output.isError }]);

    // Clear input
    this.currentCommand.set('');

    // Scroll to bottom
    setTimeout(() => {
      this.outputContainer.nativeElement.scrollTop = this.outputContainer.nativeElement.scrollHeight;
    }, 0);
  }

  processCommand(cmd: string): { text: string; isError: boolean } {
    const parts = cmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        return { text: this.getHelpText(), isError: false };
      
      case 'whoami':
        return { text: this.getWhoAmI(), isError: false };
      
      case 'ls':
        return { text: this.listFiles(args), isError: false };
      
      case 'cat':
        return { text: this.catFile(args), isError: false };
      
      case 'kubectl':
        return { text: this.kubectlCommand(args), isError: false };
      
      case 'terraform':
        return { text: this.terraformCommand(args), isError: false };
      
      case 'docker':
        return { text: this.dockerCommand(args), isError: false };
      
      case 'clear':
        this.history.set([]);
        return { text: '', isError: false };
      
      case 'date':
        return { text: new Date().toString(), isError: false };
      
      case 'pwd':
        return { text: '/home/ibrahim/devops-os', isError: false };
      
      default:
        return { text: `Command not found: ${command}. Type 'help' for available commands.`, isError: true };
    }
  }

  getHelpText(): string {
    return `Available commands:
  whoami              Display user information
  ls [options]        List directory contents
  cat <file>          Display file contents
  kubectl <args>      Kubernetes management commands
  terraform <args>    Infrastructure as Code commands
  docker <args>       Container management commands
  clear               Clear terminal screen
  date                Display current date and time
  pwd                 Print working directory
  help                Show this help message`;
  }

  getWhoAmI(): string {
    return `Ibrahim El Othmani
Full Stack / DevOps/Cloud Engineer
Specializing in: Kubernetes, Docker, AWS/Azure, IaC (Terraform/Ansible)
Location: Tunisia 🇹🇳 (Remote Available)
Experience: 1+ year in DevOps & Cloud Engineering
Status: 💼 Open to Work

"From Civil Engineering to Cloud Engineering - Building bridges between code and infrastructure."`;
  }

  listFiles(args: string[]): string {
    const detailed = args.includes('-la') || args.includes('-l');
    
    if (detailed) {
      return `total 7 apps
drwxr-xr-x  7 ibrahim devops  224 Dec 22 10:30 .
drwxr-xr-x  3 ibrahim devops   96 Dec 22 10:00 ..
-rw-r--r--  1 ibrahim devops 1.2K Dec 22 10:15 about.txt
-rw-r--r--  1 ibrahim devops 3.4K Dec 22 10:20 experience.txt
-rw-r--r--  1 ibrahim devops 2.8K Dec 22 10:25 projects.txt
-rw-r--r--  1 ibrahim devops 1.9K Dec 22 10:28 skills.yaml
-rw-r--r--  1 ibrahim devops 896B Dec 22 10:30 contact.sh`;
    }
    
    return `about.txt  experience.txt  projects.txt  skills.yaml  contact.sh`;
  }

  catFile(args: string[]): string {
    if (args.length === 0) {
      return 'cat: missing file operand\nTry: cat about.txt | experience.txt | projects.txt | skills.yaml';
    }

    const file = args[0].toLowerCase();
    
    if (file === 'about.txt' || file === 'about') {
      return this.getWhoAmI();
    }
    
    if (file === 'experience.txt' || file === 'experience') {
      return `Work Experience:

[Freelance] DevOps/Cloud Engineer (Nov 2024 - Present)
- Providing DevOps services to international clients
- Kubernetes, Docker, Terraform, AWS/Azure
- CI/CD pipelines and infrastructure automation

[IBH Ibn Alhaytham] DevOps Engineer Intern (Aug-Oct 2024)
- Docker containerization for microservices
- Kubernetes cluster setup and management
- CI/CD pipeline improvements with Jenkins

[2i Formation] Full Stack & DevOps Training (2023-2024)
- Professional training in cloud platforms (AWS, Azure)
- Kubernetes and container orchestration
- Infrastructure as Code (Terraform, Ansible)
- Full-stack development (Spring Boot, Angular)

[University] B.Sc. Civil Engineering (2020)
- Career transition from Civil to Cloud Engineering`;
    }
    
    if (file === 'skills.yaml' || file === 'skills') {
      return `cloud_platforms:
  - AWS (Intermediate, 1 year)
  - Azure (Intermediate, 1 year)

infrastructure_as_code:
  - Terraform (Intermediate, 1 year)
  - Ansible (Intermediate, 1 year)

container_orchestration:
  - Kubernetes (Intermediate, 1 year)
  - Docker (Intermediate, 1 year)
  - Helm (Basic, 1 year)

cicd_tools:
  - Jenkins (Intermediate, 1 year)
  - GitHub Actions (Intermediate, 1 year)

monitoring:
  - Prometheus (Basic, 1 year)
  - Grafana (Basic, 1 year)`;
    }
    
    return `cat: ${file}: No such file or directory`;
  }

  kubectlCommand(args: string[]): string {
    if (args.length === 0) {
      return 'kubectl: command required\nTry: kubectl get experience | kubectl get skills';
    }

    const subCmd = args[0];
    const resource = args[1];

    if (subCmd === 'get' && resource === 'experience') {
      return `NAME         ROLE                    DURATION         STATUS
freelance    DevOps/Cloud Engineer   Nov 2024-Now     Active
ibh          DevOps Intern           Aug-Oct 2024     Completed
2iformation  Training Program        2023-2024        Completed`;
    }

    if (subCmd === 'get' && resource === 'skills') {
      return `NAME          PROFICIENCY    YEARS    READY
kubernetes    Intermediate   1        ✓
terraform     Intermediate   1        ✓
aws           Intermediate   1        ✓
docker        Intermediate   1        ✓
ansible       Intermediate   1        ✓`;
    }

    return `kubectl ${args.join(' ')}: resource type not supported\nTry: kubectl get experience | kubectl get skills`;
  }

  terraformCommand(args: string[]): string {
    if (args.length === 0) {
      return 'terraform: command required\nTry: terraform plan career | terraform apply --auto-approve';
    }

    const subCmd = args[0];

    if (subCmd === 'plan' && args[1] === 'career') {
      return `Terraform will perform the following actions:

  # career.devops_engineer will be updated in-place
  ~ resource "career" "devops_engineer" {
      + certifications    = ["AWS SAA", "CKA", "Terraform Associate"]
      + impact           = "High"
      ~ skills           = [
          + "Advanced Kubernetes patterns"
          + "Multi-cloud architecture"
          + "Platform engineering"
        ]
      + years_experience = 5
    }

Plan: 0 to add, 1 to change, 0 to destroy.`;
    }

    if (subCmd === 'apply') {
      return `Apply complete! Resources: 1 updated
Contact form available at Contact.app`;
    }

    return `terraform ${args.join(' ')}: unknown command`;
  }

  dockerCommand(args: string[]): string {
    if (args.length === 0 || args[0] === 'ps') {
      return `CONTAINER ID   IMAGE              STATUS         PORTS                  NAMES
a1b2c3d4e5f6   devops-projects    Up 6 months    0.0.0.0:443->443/tcp   portfolio
g7h8i9j0k1l2   training-env       Up 1 year      0.0.0.0:3000->3000/tcp 2i-formation
m3n4o5p6q7r8   internship-app     Up 3 months    -                      ibh-projects`;
    }

    return `docker: '${args.join(' ')}' is not a recognized command`;
  }

  navigateHistory(direction: number): void {
    if (this.commandHistory.length === 0) return;

    this.historyIndex = Math.max(-1, Math.min(this.commandHistory.length - 1, this.historyIndex + direction));
    
    if (this.historyIndex >= 0) {
      this.currentCommand.set(this.commandHistory[this.historyIndex]);
    } else {
      this.currentCommand.set('');
    }
  }

  autocomplete(event: Event): void {
    event.preventDefault();
    const cmd = this.currentCommand().toLowerCase();
    const commands = ['help', 'whoami', 'ls', 'cat', 'kubectl', 'terraform', 'docker', 'clear', 'date', 'pwd'];
    
    const matches = commands.filter(c => c.startsWith(cmd));
    if (matches.length === 1) {
      this.currentCommand.set(matches[0]);
    }
  }
}

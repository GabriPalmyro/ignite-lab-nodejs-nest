export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValid = this.validateContentLenght(content);

    if (!isContentValid) {
      throw new Error('Content Lenght Error.');
    }

    this.content = content;
  }
}

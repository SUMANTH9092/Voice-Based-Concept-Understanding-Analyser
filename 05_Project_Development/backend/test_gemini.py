from gemini_utils import get_reference_definition

topic = input("Enter Topic: ")

definition = get_reference_definition(topic)

print("\nReference Definition:\n")
print(definition)
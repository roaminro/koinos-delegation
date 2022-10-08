# koinos-delegation

# Delegation contract
- private key cannot perform any action
- authorize function:
    - transaction application:
        - calls Delegation contract manager to authorize mana usage
    - contract call:
        - only allowed by Delegation contract manager (i.e.: Koin can be transferred from/to this contract by Delegation contract manager only)
    - contract upload:
        - cannot upload contract (immutable)

# Delegation contract manager
- delegation:
    - id: incrementing unique id
    - owner: address of the account that can manage the delegation
    - start timestamp: when delegation starts
    - end timestamp: when delegation ends
    - delegation amount: amount of tokens to delegate
    - delegator: account delegating the tokens
    - delegee: account receiving the delegations
    - authorization contract address of a contract managing the delegation authorization
    - authorization contract entry point of a contract managing the delegation authorization
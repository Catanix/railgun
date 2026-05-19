# Unit Testing Rail

## Structure: AAA Pattern
Every test MUST follow Arrange → Act → Assert:
1. **Arrange:** Set up mocks, fixtures, and initial state
2. **Act:** Execute the single unit of behavior being tested
3. **Assert:** Verify exactly one outcome per test case

## Mocking Rules
- Mock all external dependencies: network, filesystem, database, timers, randomness
- Never make real network requests in unit tests
- Mocks MUST be reset between tests to prevent state leakage
- Prefer explicit mock setup over global auto-mocks

## Assertions
- One logical assertion per test; if you need more, split the test
- Assert on outcomes (results, state changes), not implementation details (internal call counts)
- Error cases MUST be tested explicitly, not just the happy path

## Test Data
- Use factory functions or builders for complex objects, not copy-pasted literals
- Never use production data, PII, or real credentials in tests
- Keep test data co-located with the test or in a dedicated `__fixtures__` directory

## Forbidden Patterns
- Tests that depend on execution order of other tests
- Tests with non-deterministic inputs (random, Date.now(), network) without mocking
- Tests that assert on internal implementation rather than public behavior
